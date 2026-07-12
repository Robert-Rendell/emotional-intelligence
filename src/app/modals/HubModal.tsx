"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";

const IQ_EQ_ROWS = [
  {
    term: "EQ",
    subtitle: "Emotional Quotient",
    usedFor:
      "Measures the ability to recognize, understand, and manage your own emotions, and to read and respond to the emotions of others. Used to navigate relationships, leadership, teamwork, and mental wellbeing.",
  },
  {
    term: "IQ",
    subtitle: "Intelligence Quotient",
    usedFor:
      "Measures cognitive ability — logical reasoning, memory, spatial and verbal skills, and processing speed. Used to predict academic performance, assess analytical aptitude, and screen for learning differences.",
  },
];

type HubModalProps = {
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function HubModal({ onClose, closeButtonRef }: HubModalProps) {
  return (
    <ModalShell
      title="Emotional Intelligence (E.Q)"
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      wide
    >
      <div className={styles.modalTableWrap}>
        <p className={styles.modalDescription}>
          EQ is the foundation for every school of thought and every form of learning — and
          possibly even IQ.
        </p>
        <table className={styles.iqTable}>
          <thead>
            <tr>
              <th>Measure</th>
              <th>Used for</th>
            </tr>
          </thead>
          <tbody>
            {IQ_EQ_ROWS.map((row) => (
              <tr key={row.term}>
                <td>
                  <strong>{row.term}</strong>
                  <span className={styles.iqTermSubtitle}>{row.subtitle}</span>
                </td>
                <td>{row.usedFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalShell>
  );
}
