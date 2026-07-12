"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import styles from "../EIDiagram.module.css";

type ModalShellProps = {
  title: string;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  colorVar?: string;
  wide?: boolean;
  children: ReactNode;
};

export default function ModalShell({
  title,
  onClose,
  closeButtonRef,
  colorVar,
  wide,
  children,
}: ModalShellProps) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalCard} ${wide ? styles.modalCardWide : ""}`}
        style={colorVar ? ({ "--c": `var(${colorVar})` } as CSSProperties) : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ei-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {colorVar && <div className={styles.modalAccent} />}
        <h2 id="ei-modal-title" className={styles.modalTitle}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
