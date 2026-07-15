"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

const NEUROCHEMICAL_ROWS = [
  {
    letter: "M",
    name: "Melatonin",
    function: "Regulates sleep / wake cycle",
    howTo: "Make sure light gets in your eyes, make sure darkness gets in your eyes.",
  },
  {
    letter: "C",
    name: "Cortisol",
    function: "Stress hormone",
    howTo: "Avoid getting stressed and take your time, be patient.",
  },
  {
    letter: "E",
    name: "Endo-cannabinoids",
    function: "Relaxation / Anti-Anxiety",
    howTo: "Sustained, regular cardiovascular exercise.",
  },
  {
    letter: "D",
    name: "Dopamine",
    function: "Reward hit system (similar in dogs to assist learning)",
    howTo: "To do list, achievable bullet points that you enjoy ticking off when done.",
  },
  {
    letter: "O",
    name: "Oxytocin",
    function: "Love",
    howTo: "Find a partner in life, or a dog friend who you can take on walkies and get cuddles.",
  },
  {
    letter: "E",
    name: "Endorphins",
    function: "Self produced painkillers",
    howTo: "HIIT class, high intensity exercise (BPM high), jumping jacks.",
  },
  {
    letter: "G",
    name: "GABA",
    function: "Relaxation / Anti-Anxiety",
    howTo: "Stretching, Concentration Meditation, Sunlight Meditation, Yoga.",
  },
  {
    letter: "S",
    name: "Serotonin",
    function: "Good Mood / Confidence",
    howTo: "The \"I did it!\" feeling, gained from genuine self defined success.",
  },
  {
    letter: "A",
    name: "Adrenaline",
    function: "Fight or Flight mechanism",
    howTo: "Do things that scare you (in a safe situation).",
  },
];

type SportScienceModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function SportScienceModal({
  topic,
  onClose,
  closeButtonRef,
}: SportScienceModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>The Neurochemicals of Happiness</h3>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Author:{" "}
          <a
            className={styles.modalLink}
            href="https://www.psychologytoday.com/gb/blog/the-athletes-way/201211/the-neurochemicals-of-happiness"
            target="_blank"
            rel="noopener noreferrer"
          >
            Christopher Bergland (Psychology Today)
          </a>
        </p>
      </div>

      <div className={styles.modalTableWrap}>
        <table className={styles.neuroTable}>
          <thead>
            <tr>
              <th>Neurochemical</th>
              <th>Function</th>
              <th>How to get it</th>
            </tr>
          </thead>
          <tbody>
            {NEUROCHEMICAL_ROWS.map((row, index) => (
              <tr key={`${row.letter}-${index}`}>
                <td>
                  <strong>
                    {row.letter} — {row.name}
                  </strong>
                </td>
                <td>{row.function}</td>
                <td>{row.howTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalShell>
  );
}
