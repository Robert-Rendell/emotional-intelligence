"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type MotivationModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

const LEVELS = [
  {
    key: "self-actualisation",
    label: "SELF ACTUALISATION",
    iAm: "I am ME",
    detail: "",
    color: "#3aa15c",
    path: "M150,90 L250,90 L270,154 L130,154 Z",
    midY: 118,
  },
  {
    key: "esteem",
    label: "ESTEEM",
    iAm: "I am seen",
    detail: "confidence, respect, self esteem",
    color: "#4fa9d8",
    path: "M130,154 L270,154 L290,218 L110,218 Z",
    midY: 178,
  },
  {
    key: "love",
    label: "LOVE & BELONGING",
    iAm: "I am accepted",
    detail: "connection, relationships, love",
    color: "#8e4fae",
    path: "M110,218 L290,218 L310,282 L90,282 Z",
    midY: 242,
  },
  {
    key: "safety",
    label: "SAFETY",
    iAm: "I am safe",
    detail: "security of body, health, family, resources, property",
    color: "#eab52e",
    path: "M90,282 L310,282 L330,346 L70,346 Z",
    midY: 306,
  },
  {
    key: "physiological",
    label: "PHYSIOLOGICAL",
    iAm: "I am comfortable",
    detail: "water, sleep, food, shelter, clothes, air",
    color: "#e0955a",
    path: "M70,346 L330,346 L350,410 L50,410 Z",
    midY: 370,
  },
];

export default function MotivationModal({ topic, onClose, closeButtonRef }: MotivationModalProps) {
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
        <div className={styles.diagramWrap}>
          <svg viewBox="0 0 560 460" fontFamily="Arial, Helvetica, sans-serif">
            <text x={200} y={32} fontSize={28} fontWeight={800} fill="#1ec8d8" textAnchor="middle">
              MASLOW&apos;S
            </text>
            <text x={200} y={56} fontSize={15} fontWeight={800} fill="#1a1a1a" textAnchor="middle">
              HIERARCHY OF NEEDS
            </text>

            <line x1={22} y1={78} x2={140} y2={90} stroke="#1a1a1a" strokeWidth={1.2} strokeDasharray="4 3" markerEnd="url(#maslow-arrow)" />
            <defs>
              <marker id="maslow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 Z" fill="#1a1a1a" />
              </marker>
            </defs>
            <text x={20} y={62} fontSize={10.5} fill="#1a1a1a">
              Fulfillment,
            </text>
            <text x={20} y={74} fontSize={10.5} fill="#1a1a1a">
              morality, creativity
            </text>

            {LEVELS.map((lvl) => (
              <g key={lvl.key}>
                <path d={lvl.path} fill={lvl.color} stroke="#1a1a1a" strokeWidth={1.5} />
                <text x={200} y={lvl.midY - 6} fontSize={12} fontWeight={800} fill="#ffffff" textAnchor="middle">
                  {lvl.label}
                </text>
                <text x={200} y={lvl.midY + 9} fontSize={11} fontStyle="italic" fill="#ffffff" textAnchor="middle">
                  {lvl.iAm}
                </text>
                {lvl.detail && (
                  <text x={200} y={lvl.midY + 23} fontSize={9} fill="#ffffff" textAnchor="middle">
                    {lvl.detail}
                  </text>
                )}
              </g>
            ))}

            <path d="M400,90 L415,90 L415,154 L400,154" fill="none" stroke="var(--ink-secondary)" strokeWidth={1.2} />
            <text x={424} y={126} fontSize={10.5} fill="var(--ink-secondary)">
              Self-fulfilment
            </text>
            <text x={424} y={138} fontSize={10.5} fill="var(--ink-secondary)">
              needs
            </text>

            <path d="M400,154 L415,154 L415,282 L400,282" fill="none" stroke="var(--ink-secondary)" strokeWidth={1.2} />
            <text x={424} y={222} fontSize={10.5} fill="var(--ink-secondary)">
              Psychological
            </text>
            <text x={424} y={234} fontSize={10.5} fill="var(--ink-secondary)">
              needs
            </text>

            <path d="M400,282 L415,282 L415,410 L400,410" fill="none" stroke="var(--ink-secondary)" strokeWidth={1.2} />
            <text x={424} y={350} fontSize={10.5} fill="var(--ink-secondary)">
              Basic
            </text>
            <text x={424} y={362} fontSize={10.5} fill="var(--ink-secondary)">
              needs
            </text>
          </svg>
        </div>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>About Abraham Maslow</h4>
        <p className={styles.modalQuoteCite} style={{ marginTop: 0 }}>
          Source: &ldquo;A Theory of Human Motivation&rdquo; (1943)
        </p>
        <p className={styles.modalDescription}>
          Abraham Harold Maslow (1908&ndash;1970) was an American psychologist best known for
          creating the hierarchy of needs, a motivational theory in psychology. Born in
          Brooklyn, New York, Maslow studied at the University of Wisconsin and later became a
          professor at Brandeis University. He proposed his famous hierarchy in his 1943 paper
          &ldquo;A Theory of Human Motivation&rdquo;, arguing that human needs are arranged in a
          pyramid &mdash; from basic survival needs at the base to the pursuit of personal
          growth and self-actualisation at the peak. Maslow is considered one of the founders of
          humanistic psychology, a movement that emphasised the positive potential of human
          beings rather than focusing solely on mental illness or behavioural conditioning.
        </p>
      </div>
    </ModalShell>
  );
}
