"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type OverstimulationModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function OverstimulationModal({
  topic,
  onClose,
  closeButtonRef,
}: OverstimulationModalProps) {
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
        <h3 className={styles.modalSectionTitle}>The Yerkes&ndash;Dodson Law</h3>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Author: Robert Yerkes &amp; John Dodson (1908)
        </p>
        <p className={styles.modalDescription}>
          Performance improves with arousal or stimulation, but only up to a point. Push past
          that peak and performance falls away again &mdash; that falling-away is overstimulation.
        </p>
        <div className={styles.diagramWrap}>
          <svg viewBox="0 0 500 300" fontFamily="Arial, Helvetica, sans-serif">
            <rect x={210} y={20} width={90} height={230} fill="var(--c)" opacity={0.12} />

            <line x1={60} y1={250} x2={460} y2={250} stroke="var(--ink-faint)" strokeWidth={2} />
            <line x1={60} y1={250} x2={60} y2={30} stroke="var(--ink-faint)" strokeWidth={2} />

            <path
              d="M 80 232 C 150 70 200 50 255 50 C 310 50 360 70 430 232"
              fill="none"
              stroke="var(--c, #007da9)"
              strokeWidth={3.5}
            />

            <text x={260} y={285} fontSize={13} textAnchor="middle" fill="var(--ink-secondary)">
              Arousal / Stimulation
            </text>
            <text
              x={22}
              y={140}
              fontSize={13}
              textAnchor="middle"
              fill="var(--ink-secondary)"
              transform="rotate(-90 22 140)"
            >
              Performance
            </text>

            <text x={128} y={266} fontSize={11.5} textAnchor="middle" fill="var(--ink-muted)">
              Understimulated
            </text>
            <text x={255} y={266} fontSize={11.5} fontWeight={700} textAnchor="middle" fill="var(--ink)">
              Optimal zone
            </text>
            <text x={390} y={266} fontSize={11.5} textAnchor="middle" fill="var(--ink-muted)">
              Overstimulated
            </text>
          </svg>
        </div>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Common triggers</h4>
        <ul className={styles.modalList}>
          <li>Bright or flickering lights, loud or sudden noises, crowded spaces.</li>
          <li>Notifications, multitasking, and endless scrolling.</li>
          <li>Decision fatigue from too many open tasks or choices at once.</li>
          <li>Unfamiliar or demanding social situations.</li>
          <li>Poor sleep, hunger, or too much caffeine lowering your baseline tolerance.</li>
        </ul>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Signs you&apos;re overstimulated</h4>
        <ul className={styles.modalList}>
          <li>Irritability, or snapping at people over small things.</li>
          <li>Difficulty concentrating or following a conversation.</li>
          <li>Feeling &ldquo;wired but tired&rdquo; &mdash; keyed up yet exhausted.</li>
          <li>An urge to shut down, go quiet, or escape the room entirely.</li>
          <li>Physical tension: clenched jaw, tight shoulders, a racing heart.</li>
        </ul>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Bringing yourself back down</h4>
        <div className={styles.modalLevelGroup}>
          <div className={styles.modalLevelCard}>
            <h4 className={styles.modalSectionTitle}>In the moment</h4>
            <ul className={styles.modalList}>
              <li>Remove yourself from the stimulus &mdash; dim the lights, step outside.</li>
              <li>Belly breathing, covered in the Concentration topic.</li>
              <li>Single-task: mute notifications and close what you&apos;re not using.</li>
            </ul>
          </div>
          <div className={styles.modalLevelCard}>
            <h4 className={styles.modalSectionTitle}>Prevention</h4>
            <ul className={styles.modalList}>
              <li>Build downtime between demanding tasks instead of back-to-back.</li>
              <li>Protect your sleep and go easy on caffeine.</li>
              <li>Batch notifications instead of reacting to every instant alert.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Blindfolds and earplugs</h4>
        <p className={styles.modalDescription}>
          Sight and sound are usually the two biggest sources of input. Blocking both at once is
          a deliberate way to cut sensory load rather than just reducing it, giving an
          overstimulated nervous system a genuine chance to reset.
        </p>
        <ul className={styles.modalList}>
          <li>Naps or rest breaks in the middle of an overstimulating day.</li>
          <li>Falling asleep faster, and staying asleep, by removing light and ambient noise.</li>
          <li>Flights, trains, and other journeys where you can&apos;t control the environment.</li>
          <li>
            Recovering after a shutdown or meltdown, particularly for people with sensory
            processing differences (e.g. autism, ADHD, sensory processing disorder).
          </li>
          <li>
            Foam or wax earplugs are cheap and effective; noise-cancelling headphones are a good
            alternative when you still need to hear some sound.
          </li>
        </ul>
      </div>
    </ModalShell>
  );
}
