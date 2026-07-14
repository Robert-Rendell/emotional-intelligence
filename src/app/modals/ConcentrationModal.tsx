"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type ConcentrationModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

const BEGINNER_STEPS = [
  "Choose a quiet spot with no distractions",
  "Sit with back straight and belly unburdened",
  "Use a timer, set to 5 minutes",
  "Blow all the air out of your lungs",
  "Focus on the bottom of your belly",
  'Suck air in slowly with lips making "ooo" shape',
  'Fill all 4 corners of your "belly" with air, then fill your chest with air',
  "When you reach the top of your lung capacity, begin to blow out slowly",
  "Go back to step 4 and repeat until timer expires",
  'When you are comfortable with the technique, you can say (with your inner voice) "innnnnnnn", "ouuttttttttt"',
];

export default function ConcentrationModal({ topic, onClose, closeButtonRef }: ConcentrationModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Concentration meditation (belly breathing)</h3>
        <h4 className={styles.modalSectionTitle}>Beginner</h4>
        <ol className={styles.modalOrderedList}>
          {BEGINNER_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className={styles.modalNote}>
          When you notice your mind drifting to other thoughts other than your breathing, gently
          bring yourself back to the breathing task. Never scold yourself for drifting to other
          thoughts. It is not a competition.
        </p>
        <p className={styles.modalNote}>
          If you have lots of disruptive thoughts interrupting the exercise, then consider
          Mindfulness meditation, which is covered in the &ldquo;Awareness&rdquo; topic.
        </p>
      </div>

      <div className={styles.modalSection}>
        <div className={styles.modalLevelGroup}>
          <div className={styles.modalLevelCard}>
            <h4 className={styles.modalSectionTitle}>Intermediate level</h4>
            <ul className={styles.modalList}>
              <li>Increase timer to 10 minutes</li>
              <li>Increase timer to 15 minutes</li>
              <li>Increase timer to 20 minutes</li>
            </ul>
          </div>
          <div className={styles.modalLevelCard}>
            <h4 className={styles.modalSectionTitle}>Expert level</h4>
            <ul className={styles.modalList}>
              <li>Increase timer to 30 minutes</li>
              <li>
                Learn about the{" "}
                <a
                  className={styles.modalLink}
                  href="https://en.wikipedia.org/wiki/Dhyana_in_Buddhism#The_r%C5%ABpa_jh%C4%81nas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buddhist jhānas
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.modalLevelCard}>
            <h4 className={styles.modalSectionTitle}>Master level</h4>
            <ul className={styles.modalList}>
              <li>
                Learn about cognitive unity and instinctual deep breathing through the teachings
                of the Bhagavad Gita.
              </li>
              <li>Learn about Turiya and the differences between Maya, Atman and Brahman.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Knowledge</h4>
        <ul className={styles.modalList}>
          <li>Oxygen is absorbed through the alveoli in your lungs.</li>
          <li>
            The feeling of wanting to take another breath is the build up of carbon dioxide (CO2)
            in your lungs as the oxygen (O2) is absorbed.
          </li>
        </ul>
      </div>
    </ModalShell>
  );
}
