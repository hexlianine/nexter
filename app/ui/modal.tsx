"use client";

import { useEffect, useState } from "react";

type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ trigger, children, title = "Modal" }: ModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="modal-trigger"
      >
        {trigger}
      </button>
      {open && (
        <div
          className="modal-overlay"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-title">{title}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
