"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type DefaultTopicModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function DefaultTopicModal({
  topic,
  onClose,
  closeButtonRef,
}: DefaultTopicModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>
      <div className={styles.modalBody}>
        <p className={styles.placeholder}>Content coming soon.</p>
      </div>
    </ModalShell>
  );
}
