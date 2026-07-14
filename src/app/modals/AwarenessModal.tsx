"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import YouTubeEmbed from "./YouTubeEmbed";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type AwarenessModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function AwarenessModal({ topic, onClose, closeButtonRef }: AwarenessModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>
      <YouTubeEmbed src="https://www.youtube.com/embed/iN6g2mr0p3Q?si=W7HXe1wXAiqUrsS5" />
    </ModalShell>
  );
}
