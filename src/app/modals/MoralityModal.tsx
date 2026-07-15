"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type MoralityModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function MoralityModal({ topic, onClose, closeButtonRef }: MoralityModalProps) {
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
        <p className={styles.modalReligionLabel}>Buddhism</p>
        <h3 className={styles.modalSectionTitle}>The Noble Eightfold Path</h3>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Source: taught by the Buddha (Siddhartha Gautama)
        </p>
        <p className={styles.modalDescription}>
          Buddhism&apos;s path out of suffering. Three of the eight steps form &ldquo;s&#299;la&rdquo;
          &mdash; ethical conduct &mdash; the part most directly concerned with morality.
        </p>
        <ol className={styles.modalOrderedList}>
          <li>Right View &mdash; understanding things as they are.</li>
          <li>Right Intention &mdash; committing to ethical and mental self-improvement.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Right Speech &mdash; no lying, gossip, harsh words, or idle talk.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Right Action &mdash; no killing, stealing, or sexual misconduct.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Right Livelihood &mdash; earning a living in a way that causes no harm.
          </li>
          <li>Right Effort &mdash; cultivating wholesome states, letting go of unwholesome ones.</li>
          <li>Right Mindfulness &mdash; clear, non-judgmental awareness of body, mind, and feeling.</li>
          <li>Right Concentration &mdash; the focused, meditative states covered in Concentration.</li>
        </ol>
        <p className={styles.modalNote}>
          Right Speech, Right Action, and Right Livelihood (highlighted above) are the three
          steps most people mean when they talk about &ldquo;Buddhist morality&rdquo;
          specifically.
        </p>
      </div>

      <hr className={styles.modalDivider} />

      <div className={styles.modalSection}>
        <p className={styles.modalReligionLabel}>Judaism &amp; Christianity</p>
        <h3 className={styles.modalSectionTitle}>The Ten Commandments</h3>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Source: Hebrew Bible, Exodus 20
        </p>
        <p className={styles.modalDescription}>
          A foundational code of conduct in Judaism and Christianity, condensed here to their
          core instructions.
        </p>
        <ol className={styles.modalOrderedList}>
          <li>No other gods before me.</li>
          <li>No idols.</li>
          <li>Do not misuse the name of God.</li>
          <li>Keep the Sabbath holy.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>Honor your father and mother.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>Do not murder.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>Do not commit adultery.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>Do not steal.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>Do not bear false witness.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Do not covet what belongs to your neighbor.
          </li>
        </ol>
        <p className={styles.modalNote}>
          The first four commandments are about religious observance. The remaining six
          (highlighted above) govern how you treat other people &mdash; the part that&apos;s
          specifically about morality.
        </p>
      </div>

      <hr className={styles.modalDivider} />

      <div className={styles.modalSection}>
        <p className={styles.modalReligionLabel}>Islam</p>
        <h3 className={styles.modalSectionTitle}>The Ten Commandments of Islam</h3>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Source: Quran, Surah Al-Isra (17:22&ndash;39)
        </p>
        <p className={styles.modalDescription}>
          Not a separate revealed tablet like the Decalogue, but a single Quranic passage
          frequently cited as Islam&apos;s parallel to it.
        </p>
        <ol className={styles.modalOrderedList}>
          <li>Worship none but God.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>Be good to your parents.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Give relatives, the needy, and travelers their due, without squandering wealth.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Do not kill your children for fear of poverty.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>Do not go near adultery.</li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Do not take a life, which God has made sacred, except by right.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Do not touch an orphan&apos;s property, except to improve it.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Give full measure and weigh with justice.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Do not follow what you have no knowledge of.
          </li>
          <li style={{ color: "var(--c)", fontWeight: 700 }}>
            Do not walk on the earth with arrogance.
          </li>
        </ol>
        <p className={styles.modalNote}>
          Unlike the Decalogue, only the first item here is about worship &mdash; the remaining
          nine (highlighted above) are almost entirely about morality: family, honesty, justice,
          and humility.
        </p>
      </div>
    </ModalShell>
  );
}
