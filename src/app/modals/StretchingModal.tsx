"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
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
      <div className={styles.videoWrap}>
        <iframe
          src="https://www.youtube.com/embed/BPK9WNtpBgk?si=qDFDmIxT1DgivQgc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </ModalShell>
  );
}
