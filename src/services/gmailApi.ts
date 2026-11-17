export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailMessagePart {
  mimeType?: string;
  body?: {
    data?: string;
    size?: number;
  };
  parts?: GmailMessagePart[];
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
}

export interface GmailMessageDetail extends GmailMessageSummary {
  bodyText: string;
}

export interface GmailLabelInfo {
  id: string;
  name: string;
  type?: string;
}

export interface SendGmailPayload {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}

export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
  'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.insert',
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.metadata',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.settings.basic',
  'https://www.googleapis.com/auth/gmail.settings.sharing'
] as const;

const GMAIL_API_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

export function encodeBase64UrlUtf8(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeBase64UrlUtf8(encoded: string): string {
  if (!encoded) return '';
  const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  const binary = atob(normalized + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function buildRfc2822Email(payload: SendGmailPayload): string {
  const safeTo = payload.to.replace(/[\r\n]+/g, ' ').trim();
  const safeSubject = payload.subject.replace(/[\r\n]+/g, ' ').trim();
  const headers = [
    `To: ${safeTo}`,
    `Subject: ${safeSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"'
  ];
  if (payload.replyTo) {
    headers.push(`Reply-To: ${payload.replyTo.replace(/[\r\n]+/g, ' ').trim()}`);
  }
  return `${headers.join('\r\n')}\r\n\r\n${payload.body}`;
}

export function extractEmailHeader(headers: GmailHeader[] | undefined, targetName: string): string {
  if (!headers) return '';
  const found = headers.find((h) => h.name.toLowerCase() === targetName.toLowerCase());
  return found?.value ?? '';
}

function extractPlainTextFromPayload(payload?: GmailMessagePart): string {
  if (!payload) return '';
  if (payload.mimeType === 'text/plain' && payload.body?.data) {
    return decodeBase64UrlUtf8(payload.body.data);
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      const text = extractPlainTextFromPayload(part);
      if (text) return text;
    }
  }
  if (payload.body?.data) {
    const raw = decodeBase64UrlUtf8(payload.body.data);
    return raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return '';
}

async function gmailFetch<T>(
  path: string,
  accessToken: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${GMAIL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers || {})
    }
  });

  if (!res.ok) {
    let message = `Gmail API error (${res.status})`;
    try {
      const errorBody = await res.json();
      if (errorBody?.error?.message) {
        message = errorBody.error.message;
      }
    } catch {
      // keep status fallback
    }
    const err = new Error(message) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }

  return res.json() as Promise<T>;
}

export async function listGmailLabels(accessToken: string): Promise<GmailLabelInfo[]> {
  const data = await gmailFetch<{ labels?: GmailLabelInfo[] }>('/labels', accessToken);
  return data.labels ?? [];
}

export async function listGmailMessages(
  accessToken: string,
  options: { labelId?: string; query?: string; maxResults?: number } = {}
): Promise<GmailMessageSummary[]> {
  const params = new URLSearchParams();
  params.set('maxResults', String(options.maxResults ?? 8));
  if (options.labelId && options.labelId !== 'ALL') {
    params.append('labelIds', options.labelId);
  }
  if (options.query?.trim()) {
    params.set('q', options.query.trim());
  }

  const listData = await gmailFetch<{ messages?: Array<{ id: string; threadId: string }> }>(
    `/messages?${params.toString()}`,
    accessToken
  );

  const refs = listData.messages ?? [];
  if (refs.length === 0) return [];

  const details = await Promise.all(
    refs.map((ref) =>
      gmailFetch<{
        id: string;
        threadId: string;
        labelIds?: string[];
        snippet?: string;
        payload?: { headers?: GmailHeader[] };
      }>(
        `/messages/${ref.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,
        accessToken
      )
    )
  );

  return details.map((item) => ({
    id: item.id,
    threadId: item.threadId,
    labelIds: item.labelIds ?? [],
    snippet: item.snippet ?? '',
    subject: extractEmailHeader(item.payload?.headers, 'Subject') || '(No Subject)',
    from: extractEmailHeader(item.payload?.headers, 'From') || 'Unknown Sender',
    to: extractEmailHeader(item.payload?.headers, 'To'),
    date: extractEmailHeader(item.payload?.headers, 'Date')
  }));
}

export async function getGmailMessageDetail(
  accessToken: string,
  messageId: string
): Promise<GmailMessageDetail> {
  const item = await gmailFetch<{
    id: string;
    threadId: string;
    labelIds?: string[];
    snippet?: string;
    payload?: GmailMessagePart & { headers?: GmailHeader[] };
  }>(`/messages/${messageId}?format=full`, accessToken);

  const bodyText = extractPlainTextFromPayload(item.payload) || item.snippet || '';
  return {
    id: item.id,
    threadId: item.threadId,
    labelIds: item.labelIds ?? [],
    snippet: item.snippet ?? '',
    subject: extractEmailHeader(item.payload?.headers, 'Subject') || '(No Subject)',
    from: extractEmailHeader(item.payload?.headers, 'From') || 'Unknown Sender',
    to: extractEmailHeader(item.payload?.headers, 'To'),
    date: extractEmailHeader(item.payload?.headers, 'Date'),
    bodyText
  };
}

export async function sendGmailMessage(
  accessToken: string,
  payload: SendGmailPayload
): Promise<{ id: string; threadId: string }> {
  const raw = encodeBase64UrlUtf8(buildRfc2822Email(payload));
  return gmailFetch<{ id: string; threadId: string }>('/messages/send', accessToken, {
    method: 'POST',
    body: JSON.stringify({ raw })
  });
}

export async function createGmailDraft(
  accessToken: string,
  payload: SendGmailPayload
): Promise<{ id: string }> {
  const raw = encodeBase64UrlUtf8(buildRfc2822Email(payload));
  return gmailFetch<{ id: string }>('/drafts', accessToken, {
    method: 'POST',
    body: JSON.stringify({ message: { raw } })
  });
}

export async function trashGmailMessage(accessToken: string, messageId: string): Promise<void> {
  await gmailFetch(`/messages/${messageId}/trash`, accessToken, {
    method: 'POST'
  });
}
