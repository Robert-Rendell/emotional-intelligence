"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type SufferingIsRelativeModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function SufferingIsRelativeModal({
  topic,
  onClose,
  closeButtonRef,
}: SufferingIsRelativeModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>
      <blockquote className={styles.modalQuote}>
        &ldquo;A man&apos;s suffering is similar to the behavior of gas. If a certain quantity of
        gas is pumped into an empty chamber, it will fill the chamber completely and evenly, no
        matter how big the chamber. Thus suffering completely fills the human soul and conscious
        mind, no matter whether the suffering is great or little. Therefore the &lsquo;size&rsquo;
        of human suffering is absolutely relative.&rdquo;
        <cite className={styles.modalQuoteCite}>&mdash; Viktor Frankl, Man&apos;s Search for Meaning</cite>
      </blockquote>
    </ModalShell>
  );
}
