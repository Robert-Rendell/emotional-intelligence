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

const PSYCHE_STROKE = "var(--ink)";
const PSYCHE_BLUE = "var(--psyche-blue)";
const PSYCHE_ORANGE = "#e8871e";

const PSYCHE_CONCEPTS = [
  {
    term: "Maya",
    description:
      'The illusion of reality; considered a "dream state" because it is only a cross-section of the reality living beings can experience; produced by shallow breathing.',
  },
  {
    term: "Atman",
    description:
      "The inner self beyond the ego (e.g. desires, pride) and emotions (gunas), shared by all living things.",
  },
  {
    term: "Brahman",
    description:
      "The ultimate reality; usually best described like a dripping tap (you see it here and there), and the practice of concentration meditation allows you to turn the tap so the water flows more regularly until it flows without breaks. With practice, controlling the flow of the water (concentration) becomes yours to decide. Eventually you can train your instinctual mind to breathe deeply when you aren't even thinking about it consciously or subconsciously.",
  },
];

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
      wide
    >
      <p className={styles.modalDescription}>{topic.description}</p>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Concentration meditation (belly breathing)</h3>
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
                of the{" "}
                <a
                  className={styles.modalLink}
                  href="https://www.amazon.co.uk/Bhagavad-Easwarans-Classics-Indian-Spirituality/dp/1586380192"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bhagavad Gita
                </a>
                .
              </li>
              <li>
                Learn about{" "}
                <a
                  className={styles.modalLink}
                  href="https://en.wikipedia.org/wiki/Turiya"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Turiya
                </a>{" "}
                and the differences between Maya, Atman and Brahman.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Knowledge</h4>
        <ul className={styles.modalList}>
          <li>Oxygen is absorbed into the bloodstream through the alveoli in your lungs.</li>
          <li>
            The feeling of wanting to take another breath is the build up of carbon dioxide (CO2)
            in your lungs as the oxygen (O2) is absorbed.
          </li>
        </ul>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>Maya, Atman, Brahman</h4>
        <div className={styles.diagramWrap}>
          <svg viewBox="0 0 760 820" fontFamily="Arial, Helvetica, sans-serif">
            <rect x={0} y={0} width={760} height={820} fill="var(--surface)" />
            <defs>
              <marker id="psyche-arrow-black" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 Z" fill={PSYCHE_STROKE} />
              </marker>
              <marker id="psyche-arrow-black-thick" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 Z" fill={PSYCHE_STROKE} />
              </marker>
              <marker id="psyche-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 Z" fill={PSYCHE_BLUE} />
              </marker>
              <marker id="psyche-arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 Z" fill={PSYCHE_ORANGE} />
              </marker>
            </defs>

            {/* top coordinate triad */}
            <line x1={80} y1={300} x2={25} y2={225} stroke={PSYCHE_STROKE} strokeWidth={3} markerEnd="url(#psyche-arrow-black)" />
            <line x1={80} y1={300} x2={80} y2={220} stroke={PSYCHE_STROKE} strokeWidth={3} markerEnd="url(#psyche-arrow-black)" />
            <line x1={80} y1={300} x2={40} y2={360} stroke={PSYCHE_STROKE} strokeWidth={2.5} markerEnd="url(#psyche-arrow-black)" />
            <line x1={80} y1={300} x2={725} y2={300} stroke={PSYCHE_STROKE} strokeWidth={5} markerEnd="url(#psyche-arrow-black-thick)" />
            <text x={5} y={210} fontSize={22} fill={PSYCHE_STROKE}>up</text>
            <text x={90} y={216} fontSize={24} fill={PSYCHE_STROKE}>y</text>
            <text x={15} y={395} fontSize={24} fill={PSYCHE_STROKE}>z</text>
            <text x={100} y={294} fontSize={24} fill={PSYCHE_STROKE}>x</text>

            {/* circled point of unity where Atman meets Brahman */}
            <circle cx={403} cy={300} r={22} fill="none" stroke={PSYCHE_BLUE} strokeWidth={3} />
            <line x1={363} y1={150} x2={397} y2={279} stroke={PSYCHE_BLUE} strokeWidth={3} markerEnd="url(#psyche-arrow-blue)" />
            <line x1={563} y1={140} x2={543} y2={296} stroke={PSYCHE_BLUE} strokeWidth={3} markerEnd="url(#psyche-arrow-blue)" />
            <text x={363} y={115} fontSize={32} textAnchor="middle" fill={PSYCHE_STROKE}>Atman</text>
            <text x={563} y={105} fontSize={32} textAnchor="middle" fill={PSYCHE_STROKE}>Brahman</text>

            {/* surfaces of realisation pyramid */}
            <line x1={403} y1={300} x2={173} y2={650} stroke={PSYCHE_STROKE} strokeWidth={4} strokeLinecap="round" />
            <line x1={403} y1={300} x2={633} y2={650} stroke={PSYCHE_STROKE} strokeWidth={4} strokeLinecap="round" />

            <line x1={153} y1={400} x2={653} y2={400} stroke={PSYCHE_STROKE} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
            <line x1={153} y1={480} x2={653} y2={480} stroke={PSYCHE_STROKE} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
            <line x1={153} y1={560} x2={653} y2={560} stroke={PSYCHE_STROKE} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
            <line x1={395} y1={595} x2={430} y2={560} stroke={PSYCHE_BLUE} strokeWidth={3} markerEnd="url(#psyche-arrow-blue)" />
            <text x={403} y={615} fontSize={20} textAnchor="middle" fill={PSYCHE_STROKE}>surfaces of realisation</text>

            {/* Maya at the base */}
            <line x1={438} y1={758} x2={403} y2={654} stroke={PSYCHE_BLUE} strokeWidth={3} markerEnd="url(#psyche-arrow-blue)" />
            <text x={438} y={790} fontSize={32} textAnchor="middle" fill={PSYCHE_STROKE}>Maya</text>

            {/* bottom coordinate triad */}
            <line x1={80} y1={650} x2={80} y2={575} stroke={PSYCHE_STROKE} strokeWidth={2.5} markerEnd="url(#psyche-arrow-black)" />
            <line x1={80} y1={650} x2={725} y2={650} stroke={PSYCHE_STROKE} strokeWidth={5} markerEnd="url(#psyche-arrow-black-thick)" />
            <line x1={80} y1={650} x2={45} y2={695} stroke={PSYCHE_STROKE} strokeWidth={2.5} markerEnd="url(#psyche-arrow-black)" />
            <text x={90} y={566} fontSize={24} fill={PSYCHE_STROKE}>y</text>
            <text x={100} y={644} fontSize={24} fill={PSYCHE_STROKE}>x</text>
            <text x={30} y={725} fontSize={24} fill={PSYCHE_STROKE}>z</text>

            {/* deep breathing, ascending through the surfaces */}
            <line x1={648} y1={650} x2={648} y2={300} stroke={PSYCHE_ORANGE} strokeWidth={6} markerEnd="url(#psyche-arrow-orange)" />
            <text
              x={671}
              y={515}
              fontSize={20}
              fontWeight={700}
              textAnchor="middle"
              fill={PSYCHE_ORANGE}
              transform="rotate(-90 671 515)"
            >
              deep breathing
            </text>

            <text x={605} y={805} fontSize={11} fill="var(--ink-faint)" textAnchor="end">
              Copyright &copy; Robert Rendell 2026
            </text>
          </svg>
        </div>

        <div className={styles.modalTableWrap}>
          <table className={styles.iqTable}>
            <thead>
              <tr>
                <th>Concept</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {PSYCHE_CONCEPTS.map((row) => (
                <tr key={row.term}>
                  <td>
                    <strong>{row.term}</strong>
                  </td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModalShell>
  );
}
