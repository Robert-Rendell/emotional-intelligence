"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type EmpathyModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

const BULLY_TYPES = [
  {
    name: "The Confident Bully",
    description:
      "Possesses a big ego, lacks empathy, and often has a sense of entitlement to get what they want.",
  },
  {
    name: "The Social Bully",
    description: "Uses gossip, rumors, and social exclusion to maintain their status and power.",
  },
  {
    name: "The Impulsive/Hyperactive Bully",
    description:
      "Has difficulty controlling their behavior, often acting out spontaneously or aggressively (sometimes linked to ADHD).",
  },
  {
    name: "The Fully Armored Bully",
    description:
      "Presents a cold, unemotional exterior but is highly calculated in how they target others, often acting out of fear or having been bullied themselves.",
  },
  {
    name: "The Accidental/Imitative Bully",
    description:
      "Someone who joins in or acts offensively simply by following the crowd, without initially realizing the severity of their impact.",
  },
];

export default function EmpathyModal({ topic, onClose, closeButtonRef }: EmpathyModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Bully Behavioral Types</h3>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Author: Barbara Coloroso (writing: The Bully, The Bullied, and the Bystander)
        </p>
        <ul className={styles.modalList}>
          {BULLY_TYPES.map((type) => (
            <li key={type.name}>
              <strong>{type.name}:</strong> {type.description}
            </li>
          ))}
        </ul>
      </div>
    </ModalShell>
  );
}
