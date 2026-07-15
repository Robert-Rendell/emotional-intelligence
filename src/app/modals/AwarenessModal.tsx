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

      <blockquote className={styles.modalQuote}>
        &ldquo;Don&apos;t think&hellip; wait for thought&rdquo;
        <cite className={styles.modalQuoteCite}>&mdash; Enigmatic, 2025</cite>
      </blockquote>

      <div className={styles.modalSection} style={{ marginTop: "1.25rem" }}>
        <h3 className={styles.modalSectionTitle}>Mindfulness meditation</h3>
        <ul className={styles.modalList}>
          <li style={{ listStyle: "none" }}>
            Mindfulness meditation is different from concentration meditation.
          </li>
          <li style={{ listStyle: "none" }}>An easy way to do it is:</li>
        </ul>
        <ol className={styles.modalOrderedList}>
          <li>Sit or lie down in a quiet place with no distractions</li>
          <li>Set a timer for 10 minutes</li>
          <li>Use a notepad and pen to write down thoughts that come up in your mind</li>
          <li>Once you write it down, think &ldquo;ok what else?&rdquo;</li>
          <li>
            When the timer expires, or you finish writing unique items on the list, take a break
            and come back to your list with a clear mind.
          </li>
          <li>
            You can mark items on your list with &ldquo;Actionable&rdquo; or &ldquo;Not
            actionable&rdquo;
          </li>
          <li>
            Those items outside of your control, you can rest assured that you have it written
            down and empty it from your mind.
          </li>
          <li>
            As the day goes on, if persistent thoughts arrive in mind that exist on your written
            list that aren&apos;t actionable, you can say &ldquo;Let it go&rdquo;.
          </li>
        </ol>
        <p className={styles.modalNote}>
          Optional: If the same thoughts come up again you can write a tally next to the item you
          wrote previously; this helps with prioritisation afterwards.
        </p>
      </div>

      <div className={styles.modalSection}>
        <YouTubeEmbed src="https://www.youtube.com/embed/iN6g2mr0p3Q?si=W7HXe1wXAiqUrsS5" />
        <p className={styles.modalQuoteCite}>Author: Andy Puddicombe (Headspace)</p>
      </div>
    </ModalShell>
  );
}
