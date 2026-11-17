import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  Search,
  RefreshCw,
  Send,
  Trash2,
  FileText,
  Inbox,
  LogOut,
  Mail,
  Reply,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  listGmailMessages,
  getGmailMessageDetail,
  sendGmailMessage,
  createGmailDraft,
  trashGmailMessage,
  GmailMessageSummary,
  GmailMessageDetail
} from '../services/gmailApi';
import { clearAccessToken } from '../services/gmailAuth';
import { GoogleSignInButton } from './GoogleSignInButton';
import { GmailConfirmModal, GmailPendingAction } from './GmailConfirmModal';

interface GmailWorkspacePanelProps {
  user: User | null;
  accessToken: string | null;
  isLoggingIn: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onAuthExpired: () => void;
}

const LABEL_FILTERS = [
  { id: 'INBOX', label: 'Inbox' },
  { id: 'SENT', label: 'Sent' },
  { id: 'STARRED', label: 'Starred' },
  { id: 'ALL', label: 'All Mail' }
] as const;

export const GmailWorkspacePanel: React.FC<GmailWorkspacePanelProps> = ({
  user,
  accessToken,
  isLoggingIn,
  onSignIn,
  onSignOut,
  onAuthExpired
}) => {
  const [viewMode, setViewMode] = useState<'inbox' | 'compose'>('inbox');
  const [labelFilter, setLabelFilter] = useState<string>('INBOX');
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageDetail | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [composeTo, setComposeTo] = useState('dpasindu487@gmail.com');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const [pendingAction, setPendingAction] = useState<GmailPendingAction | null>(null);
  const [isExecutingAction, setIsExecutingAction] = useState(false);
  const [statusBanner, setStatusBanner] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleApiError = useCallback(
    (err: unknown, fallback: string) => {
      const status = (err as { status?: number })?.status;
      if (status === 401 || status === 403) {
        clearAccessToken();
        onAuthExpired();
        setStatusBanner({
          type: 'error',
          text: 'Your Google session expired or needs permissions. Please sign in again.'
        });
        return;
      }
      const message = err instanceof Error ? err.message : fallback;
      setStatusBanner({ type: 'error', text: message });
    },
    [onAuthExpired]
  );

  const fetchMessages = useCallback(async () => {
    if (!accessToken) return;
    setLoadingList(true);
    setStatusBanner(null);
    try {
      const items = await listGmailMessages(accessToken, {
        labelId: labelFilter,
        query: submittedQuery,
        maxResults: 8
      });
      setMessages(items);
    } catch (err) {
      handleApiError(err, 'Unable to load Gmail messages.');
    } finally {
      setLoadingList(false);
    }
  }, [accessToken, labelFilter, submittedQuery, handleApiError]);

  useEffect(() => {
    if (accessToken && viewMode === 'inbox') {
      fetchMessages();
    }
  }, [accessToken, viewMode, fetchMessages]);

  const handleSelectMessage = async (msgId: string) => {
    if (!accessToken) return;
    setLoadingDetail(true);
    setStatusBanner(null);
    try {
      const detail = await getGmailMessageDetail(accessToken, msgId);
      setSelectedMessage(detail);
    } catch (err) {
      handleApiError(err, 'Unable to load email message.');
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleReplyFromMessage = (msg: GmailMessageDetail) => {
    const emailMatch = msg.from.match(/<([^>]+)>/);
    const replyTarget = emailMatch ? emailMatch[1] : msg.from;
    const replySubject = msg.subject.toLowerCase().startsWith('re:')
      ? msg.subject
      : `Re: ${msg.subject}`;
    setComposeTo(replyTarget);
    setComposeSubject(replySubject);
    setComposeBody(`\n\n--- Original Message ---\nFrom: ${msg.from}\nDate: ${msg.date}\n\n${msg.bodyText}`);
    setViewMode('compose');
  };

  const handleRequestComposeAction = (type: 'send' | 'draft') => {
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      setStatusBanner({
        type: 'error',
        text: 'Please fill in recipient, subject, and message body before continuing.'
      });
      return;
    }
    setStatusBanner(null);
    setPendingAction({
      type,
      to: composeTo.trim(),
      subject: composeSubject.trim(),
      body: composeBody
    });
  };

  const handleConfirmPendingAction = async () => {
    if (!pendingAction || !accessToken) return;
    setIsExecutingAction(true);
    setStatusBanner(null);

    try {
      if (pendingAction.type === 'send') {
        await sendGmailMessage(accessToken, {
          to: pendingAction.to,
          subject: pendingAction.subject,
          body: pendingAction.body,
          replyTo: pendingAction.replyTo
        });
        setStatusBanner({
          type: 'success',
          text: `Email sent to ${pendingAction.to} via Gmail.`
        });
        setComposeSubject('');
        setComposeBody('');
        setViewMode('inbox');
      } else if (pendingAction.type === 'draft') {
        await createGmailDraft(accessToken, {
          to: pendingAction.to,
          subject: pendingAction.subject,
          body: pendingAction.body
        });
        setStatusBanner({
          type: 'success',
          text: `Draft "${pendingAction.subject}" saved to Gmail.`
        });
      } else if (pendingAction.type === 'trash') {
        await trashGmailMessage(accessToken, pendingAction.messageId);
        setMessages((prev) => prev.filter((item) => item.id !== pendingAction.messageId));
        if (selectedMessage?.id === pendingAction.messageId) {
          setSelectedMessage(null);
        }
        setStatusBanner({
          type: 'success',
          text: `Moved "${pendingAction.subject}" to Gmail Trash.`
        });
      }
      setPendingAction(null);
    } catch (err) {
      setPendingAction(null);
      handleApiError(err, 'Gmail action failed.');
    } finally {
      setIsExecutingAction(false);
    }
  };

  if (!accessToken || !user) {
    return (
      <div className="py-8 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] mx-auto flex items-center justify-center">
          <Mail className="w-7 h-7" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-white font-poppins">
            Connect Your Gmail Account
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-lato leading-relaxed">
            Sign in with Google to browse your Gmail inbox, read client threads, save drafts, or send
            emails directly with explicit confirmation before any message action.
          </p>
        </div>
        <div className="pt-1 flex justify-center">
          <GoogleSignInButton
            onClick={onSignIn}
            disabled={isLoggingIn}
            label={isLoggingIn ? 'Connecting Google...' : 'Sign in with Google'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Connected Account Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#111111] border border-neutral-800">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/40 text-[#FF6A00] flex items-center justify-center text-xs font-bold shrink-0">
            {(user.displayName || user.email || 'G')[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">
              {user.displayName || 'Connected Gmail'}
            </p>
            <p className="text-[11px] text-neutral-400 font-mono truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedMessage(null);
              setViewMode(viewMode === 'inbox' ? 'compose' : 'inbox');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              viewMode === 'compose'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'bg-[#FF6A00] hover:bg-[#ff7a1a] text-black'
            }`}
          >
            {viewMode === 'compose' ? (
              <>
                <Inbox className="w-3.5 h-3.5" />
                <span>Inbox</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Compose</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onSignOut}
            aria-label="Sign out of Gmail"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-[11px] font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      {statusBanner && (
        <div
          role="status"
          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs ${
            statusBanner.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {statusBanner.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusBanner.text}</span>
        </div>
      )}

      {viewMode === 'compose' ? (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="gmail-to" className="text-xs font-semibold text-neutral-300 font-poppins">
              To
            </label>
            <input
              id="gmail-to"
              type="email"
              value={composeTo}
              onChange={(e) => setComposeTo(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#121212] border border-neutral-800 focus:border-[#FF6A00] text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="gmail-subject"
              className="text-xs font-semibold text-neutral-300 font-poppins"
            >
              Subject
            </label>
            <input
              id="gmail-subject"
              type="text"
              value={composeSubject}
              onChange={(e) => setComposeSubject(e.target.value)}
              placeholder="Project collaboration follow-up"
              className="w-full px-4 py-2.5 rounded-xl bg-[#121212] border border-neutral-800 focus:border-[#FF6A00] text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="gmail-body"
              className="text-xs font-semibold text-neutral-300 font-poppins"
            >
              Message
            </label>
            <textarea
              id="gmail-body"
              rows={6}
              value={composeBody}
              onChange={(e) => setComposeBody(e.target.value)}
              placeholder="Write your email message..."
              className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-neutral-800 focus:border-[#FF6A00] text-sm text-white placeholder-neutral-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleRequestComposeAction('draft')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => handleRequestComposeAction('send')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FF6A00]/20 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Review &amp; Send</span>
            </button>
          </div>
        </div>
      ) : selectedMessage ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-[#FF6A00] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Messages</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleReplyFromMessage(selectedMessage)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#1E1E1E] border border-neutral-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <Reply className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Reply</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setPendingAction({
                    type: 'trash',
                    messageId: selectedMessage.id,
                    subject: selectedMessage.subject,
                    from: selectedMessage.from
                  })
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Trash</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111111] border border-neutral-800 space-y-3">
            <h4 className="text-base font-bold text-white font-poppins">
              {selectedMessage.subject}
            </h4>
            <div className="text-[11px] text-neutral-400 font-mono space-y-0.5 pb-3 border-b border-neutral-800">
              <p className="truncate">From: {selectedMessage.from}</p>
              {selectedMessage.to && <p className="truncate">To: {selectedMessage.to}</p>}
              {selectedMessage.date && <p>Date: {selectedMessage.date}</p>}
            </div>
            <pre className="text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap break-words font-lato leading-relaxed max-h-64 overflow-y-auto">
              {selectedMessage.bodyText}
            </pre>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search & Label Filters */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmittedQuery(searchQuery);
              }}
              className="flex-1 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Gmail messages (e.g. client, brief, invoice)..."
                  aria-label="Search Gmail messages"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121212] border border-neutral-800 focus:border-[#FF6A00] text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-neutral-800 text-xs font-semibold text-white cursor-pointer"
              >
                Search
              </button>
            </form>

            <button
              type="button"
              onClick={fetchMessages}
              disabled={loadingList}
              aria-label="Refresh Gmail messages"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-neutral-800 text-xs text-neutral-300 hover:text-white cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingList ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {LABEL_FILTERS.map((tab) => {
              const active = labelFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLabelFilter(tab.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FF6A00] text-black font-bold'
                      : 'bg-[#121212] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Message List */}
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {loadingList || loadingDetail ? (
              <div className="py-10 text-center text-xs text-neutral-400 font-mono">
                {loadingDetail ? 'Opening email thread...' : 'Loading Gmail messages...'}
              </div>
            ) : messages.length === 0 ? (
              <div className="py-10 text-center text-xs text-neutral-400 font-lato">
                No Gmail messages found for this filter.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 rounded-2xl bg-[#111111] hover:bg-[#161616] border border-neutral-800/90 hover:border-[#FF6A00]/60 transition-colors flex items-start justify-between gap-3"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectMessage(msg.id)}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white truncate">{msg.from}</span>
                      <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                        {msg.date.split(',').slice(0, 2).join(',')}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#FF6A00] truncate mt-0.5">
                      {msg.subject}
                    </p>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5 font-lato">
                      {msg.snippet}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPendingAction({
                        type: 'trash',
                        messageId: msg.id,
                        subject: msg.subject,
                        from: msg.from
                      })
                    }
                    aria-label={`Move ${msg.subject} to trash`}
                    title="Move to Trash"
                    className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <GmailConfirmModal
        action={pendingAction}
        isExecuting={isExecutingAction}
        onCancel={() => setPendingAction(null)}
        onConfirm={handleConfirmPendingAction}
      />
    </div>
  );
};
