import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

export function SimpleDialog({ open, title, onClose, children, footer }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="simple-dialog-title"
        className="relative z-10 mt-auto max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto rounded-t-card border border-black/10 bg-white p-5 shadow-xl sm:mt-0 sm:rounded-card"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="simple-dialog-title" className="text-lg font-bold text-black">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-btn p-1 text-muted-navy hover:bg-surface"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
        {footer ? (
          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-black/5 pt-4">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
