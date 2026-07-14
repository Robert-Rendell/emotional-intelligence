"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import YouTubeEmbed from "./YouTubeEmbed";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type StretchingModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function StretchingModal({ topic, onClose, closeButtonRef }: StretchingModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>
      <YouTubeEmbed src="https://www.youtube.com/embed/BPK9WNtpBgk?si=qDFDmIxT1DgivQgc" />
    </ModalShell>
  );
}
