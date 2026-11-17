import React from 'react';
import { AlertTriangle, Mail, Trash2, FileText, X } from 'lucide-react';

export type GmailPendingAction =
  | {
      type: 'send';
      to: string;
      subject: string;
      body: string;
      replyTo?: string;
    }
  | {
      type: 'draft';
      to: string;
      subject: string;
      body: string;
    }
  | {
      type: 'trash';
      messageId: string;
      subject: string;
      from: string;
    };

interface GmailConfirmModalProps {
  action: GmailPendingAction | null;
  isExecuting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const GmailConfirmModal: React.FC<GmailConfirmModalProps> = ({
  action,
  isExecuting,
  onCancel,
  onConfirm
}) => {
  if (!action) return null;

  const isTrash = action.type === 'trash';
  const isDraft = action.type === 'draft';

  const title = isTrash
    ? 'Move Email to Trash?'
    : isDraft
      ? 'Save Draft to Gmail?'
      : 'Send Email via Gmail?';

  const description = isTrash
    ? 'This message will be moved to your Gmail Trash folder.'
    : isDraft
      ? 'A new draft will be created in your Gmail account with the details below.'
      : 'This will immediately send an email from your signed-in Google account.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gmail-confirm-title"
    >
      <div className="w-full max-w-lg rounded-3xl bg-[#0A0A0A] border border-neutral-800 shadow-2xl p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isTrash
                  ? 'bg-red-500/10 border-red-500/40 text-red-400'
                  : 'bg-[#FF6A00]/10 border-[#FF6A00]/40 text-[#FF6A00]'
              }`}
            >
              {isTrash ? (
                <Trash2 className="w-5 h-5" />
              ) : isDraft ? (
                <FileText className="w-5 h-5" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 id="gmail-confirm-title" className="text-base font-bold text-white font-poppins">
                {title}
              </h3>
              <p className="text-xs text-neutral-400 font-lato mt-0.5">{description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isExecuting}
            aria-label="Close confirmation dialog"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="rounded-2xl bg-[#121212] border border-neutral-800 p-4 space-y-2.5 text-xs">
          {action.type === 'trash' ? (
            <>
              <div>
                <span className="text-neutral-400 font-mono uppercase text-[10px] block">From</span>
                <span className="text-neutral-200 font-medium break-all">{action.from}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-mono uppercase text-[10px] block">Subject</span>
                <span className="text-white font-semibold break-words">{action.subject}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-red-400 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>You can restore this message later from Gmail Trash if needed.</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-neutral-400 font-mono uppercase text-[10px] block">To</span>
                <span className="text-white font-semibold break-all">{action.to}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-mono uppercase text-[10px] block">Subject</span>
                <span className="text-neutral-200 font-medium break-words">{action.subject}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-mono uppercase text-[10px] block">
                  Message Preview
                </span>
                <p className="text-neutral-300 whitespace-pre-wrap max-h-36 overflow-y-auto mt-1 leading-relaxed font-lato">
                  {action.body}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            disabled={isExecuting}
            className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isExecuting}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60 ${
              isTrash
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-[#FF6A00] hover:bg-[#ff7a1a] text-black'
            }`}
          >
            {isExecuting
              ? 'Processing...'
              : isTrash
                ? 'Confirm Move to Trash'
                : isDraft
                  ? 'Confirm Save Draft'
                  : 'Confirm & Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
};
