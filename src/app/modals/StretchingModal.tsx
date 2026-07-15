"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import YouTubeEmbed from "./YouTubeEmbed";
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

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Systems of the Body</h4>
        <ul className={styles.modalList}>
          <li style={{ listStyle: "none" }}>
            🧠 <strong>Nervous system:</strong> the brain, spinal cord, and nerves that sense the
            environment and coordinate every other system&apos;s response to it.
          </li>
          <li style={{ listStyle: "none" }}>
            🧪 <strong>Endocrine system:</strong> glands (thyroid, adrenal, pituitary, and
            others) that release hormones to regulate mood, metabolism, growth, and stress
            response.
          </li>
          <li style={{ listStyle: "none" }}>
            ❤️ <strong>Cardiovascular system:</strong> the heart and blood vessels that pump
            blood, delivering oxygen and nutrients around the body.
          </li>
          <li style={{ listStyle: "none" }}>
            🫁 <strong>Respiratory system:</strong> the lungs and airways responsible for gas
            exchange &mdash; taking in oxygen and expelling carbon dioxide.
          </li>
          <li style={{ listStyle: "none" }}>
            🦴 <strong>Musculoskeletal system:</strong> muscles, bones, and joints that give the
            body structure, protection, and the ability to move.
          </li>
          <li style={{ listStyle: "none" }}>
            🍽️ <strong>Digestive system:</strong> the gut and associated organs that break down
            food and absorb nutrients.
          </li>
          <li style={{ listStyle: "none" }}>
            🛡️ <strong>Immune system:</strong> the body&apos;s defense network against
            infection, injury, and disease.
          </li>
          <li style={{ listStyle: "none" }}>
            🧴 <strong>Integumentary system:</strong> skin, hair, and nails, which protect the
            body and help regulate temperature.
          </li>
        </ul>
      </div>

      <div className={styles.modalSection} style={{ marginBottom: "1.25rem" }}>
        <h4 className={styles.modalSectionTitle}>Stretching Effects on the Body</h4>
        <ul className={styles.modalList}>
          <li style={{ listStyle: "none" }}>
            🧪 <strong>Endocrine system:</strong> twists, inversions, and deep breathing
            stimulate the thyroid, adrenal, and pituitary glands, helping lower cortisol and
            balance hormone production.
          </li>
          <li style={{ listStyle: "none" }}>
            🧠 <strong>Nervous system:</strong> slow, controlled breathing activates the
            parasympathetic (rest and digest) response, shifting the body out of fight-or-flight
            and improving heart rate variability.
          </li>
          <li style={{ listStyle: "none" }}>
            ❤️ <strong>Cardiovascular system:</strong> regular practice lowers resting blood
            pressure and heart rate and improves circulation.
          </li>
          <li style={{ listStyle: "none" }}>
            🦴 <strong>Musculoskeletal system:</strong> builds flexibility, joint mobility, and
            functional strength while releasing chronic muscular tension.
          </li>
          <li style={{ listStyle: "none" }}>
            🫁 <strong>Respiratory system:</strong> increases lung capacity and trains more
            efficient, diaphragmatic breathing.
          </li>
          <li style={{ listStyle: "none" }}>
            🛡️🍽️ <strong>Immune and digestive systems:</strong> lower stress hormone levels
            reduce systemic inflammation, and twisting postures stimulate the digestive organs.
          </li>
        </ul>
      </div>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Yoga with Adriene</h3>
        <YouTubeEmbed src="https://www.youtube.com/embed/BPK9WNtpBgk?si=qDFDmIxT1DgivQgc" />
        <p className={styles.modalQuoteCite}>Author: Yoga with Adriene</p>
      </div>

      <div className={styles.modalSection} style={{ marginTop: "1.25rem" }}>
        <h4 className={styles.modalSectionTitle}>The Four Paths of Yoga</h4>
        <p className={styles.modalDescription}>
          Yoga does not mean stretching, it means &ldquo;skill in action&rdquo;.
        </p>
        <p className={styles.modalDescription}>The four types of Upanishadic yoga are:</p>
        <ul className={styles.modalList}>
          <li>
            <strong>Karma Yoga:</strong> the path of selfless action, doing your duty without
            attachment to the outcome.
          </li>
          <li>
            <strong>Bhakti Yoga:</strong> the path of devotion, surrendering the ego through love
            and worship.
          </li>
          <li>
            <strong>Jnana Yoga:</strong> the path of knowledge, using discernment and
            self-inquiry to see through illusion.
          </li>
          <li>
            <strong>Raja Yoga:</strong> the path of meditation and mental discipline, mastering
            the mind through practices such as concentration and breath control.
          </li>
        </ul>
      </div>
    </ModalShell>
  );
}
