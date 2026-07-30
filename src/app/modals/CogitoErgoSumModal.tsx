"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type CogitoErgoSumModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

const MNEMONIC = [
  { letter: "T", word: "Thoughts" },
  { letter: "W", word: "Words" },
  { letter: "A", word: "Actions" },
  { letter: "H", word: "Habit" },
  { letter: "C", word: "Character" },
  { letter: "D", word: "Destiny" },
  { letter: "B", word: "Become" },
];

export default function CogitoErgoSumModal({
  topic,
  onClose,
  closeButtonRef,
}: CogitoErgoSumModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
      wide
    >
      <p className={styles.modalDescription}>{topic.description}</p>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>A Mnemonic: Thoughts to Destiny</h3>
        <blockquote className={styles.modalQuote}>
          &ldquo;The World Always Has Colour &mdash; Delicious Bacon&rdquo;
        </blockquote>
        <ol className={styles.modalOrderedList} style={{ marginTop: "0.9rem" }}>
          {MNEMONIC.map(({ letter, word }) => (
            <li key={letter}>
              <strong>{letter}</strong> = {word}
            </li>
          ))}
        </ol>
        <p className={styles.modalDescription} style={{ marginTop: "0.9rem", marginBottom: 0 }}>
          The thoughts in your mind shape your words and actions, your actions shape your
          habits, your habits shape your character, your character shapes your destiny &mdash;
          and that&apos;s the person you become.
        </p>
      </div>

      <hr className={styles.modalDivider} />

      <div className={styles.modalSection}>
        <p className={styles.modalReligionLabel}>Hinduism</p>
        <h3 className={styles.modalSectionTitle}>Scriptural Roots: The Upanishads</h3>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Source: Maitri Upanishad; Brihadaranyaka Upanishad 4.4.5
        </p>
        <p className={styles.modalDescription}>
          The foundational scriptural loop of &ldquo;desire to destiny&rdquo; is formally
          tracked in the ancient Maitri Upanishad and the Brihadaranyaka Upanishad (4.4.5). The
          progression is laid out as follows:
        </p>
        <ul className={styles.modalList}>
          <li>
            <strong>Desire &amp; Thoughts:</strong> &ldquo;You are what your deepest desire is.
            As your desire is, so is your intention.&rdquo;
          </li>
          <li>
            <strong>Will &amp; Action:</strong> &ldquo;As your intention is, so is your will. As
            your will is, so is your deed.&rdquo;
          </li>
          <li>
            <strong>Habit &amp; Destiny:</strong> &ldquo;As your deed is, so is your
            destiny.&rdquo;
          </li>
        </ul>
      </div>

      <hr className={styles.modalDivider} />

      <div className={styles.modalSection}>
        <p className={styles.modalReligionLabel}>Buddhism</p>
        <h3 className={styles.modalSectionTitle}>Mind Precedes All Things</h3>
        <p className={styles.modalDescription}>
          The core teaching of Buddhism states that our lives and experiences are shaped by our
          minds, meaning that actions begin as intentions, thoughts turn into habits, and a pure
          mind brings lasting happiness.
        </p>
      </div>

      <hr className={styles.modalDivider} />

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Mahatma Gandhi</h3>
        <p className={styles.modalDescription}>
          Heavily influenced by Hindu philosophy, Gandhi phrased a nearly identical chain:
        </p>
        <blockquote className={styles.modalQuote}>
          &ldquo;Your beliefs become your thoughts&hellip; thoughts become words&hellip; words
          become actions&hellip; actions become habits&hellip; habits become values&hellip;
          values become your destiny.&rdquo;
          <cite className={styles.modalQuoteCite}>&mdash; attributed to Mahatma Gandhi</cite>
        </blockquote>
      </div>
    </ModalShell>
  );
}
