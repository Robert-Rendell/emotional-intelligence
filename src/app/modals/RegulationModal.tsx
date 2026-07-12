"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type RegulationModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function RegulationModal({ topic, onClose, closeButtonRef }: RegulationModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
      wide
    >
      <p className={styles.modalDescription}>{topic.description}</p>
      <div className={styles.diagramWrap}>
        <svg viewBox="0 0 840 510" fontFamily="Arial, Helvetica, sans-serif">
          <defs>
            <pattern id="pat-angry" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="14" height="14" fill="#c1272d" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#1a1a1a" strokeWidth="2" />
            </pattern>
            <pattern id="pat-frustrated" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="14" height="14" fill="#dd5a2b" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#1a1a1a" strokeWidth="2" />
            </pattern>
            <pattern id="pat-excited" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="14" height="14" fill="#f6c716" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#1a1a1a" strokeWidth="2" />
            </pattern>
            <pattern id="pat-anxious" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="10" height="10" fill="#f6f5f0" />
              <line x1="0" y1="0" x2="0" y2="10" stroke="#1a1a1a" strokeWidth="2" />
            </pattern>
            <pattern id="pat-happy" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="14" height="14" fill="#7fbf3f" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#2fb8ac" strokeWidth="2.5" />
            </pattern>
            <pattern id="pat-calm" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="14" height="14" fill="#f2a0a0" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#1f5c3a" strokeWidth="2.5" />
            </pattern>
            <pattern id="pat-sadtired" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="14" height="14" fill="#8fcbe8" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#3f7fae" strokeWidth="2.5" />
            </pattern>
            <pattern id="pat-upset" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="14" height="14" fill="#7a8ba0" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#3d4552" strokeWidth="2.5" />
            </pattern>
            <pattern id="pat-banner" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="12" height="12" fill="#4b1d63" />
              <line x1="0" y1="0" x2="0" y2="12" stroke="#f2eaf5" strokeWidth="2" />
            </pattern>
          </defs>

          <rect x="6" y="6" width="828" height="498" rx="14" fill="none" stroke="#1a1a1a" strokeWidth="3" />
          <rect x="40" y="-8" width="170" height="28" rx="14" fill="#fcfcfb" stroke="#1a1a1a" strokeWidth="2.5" />
          <text x="125" y="6" fontSize="15" fontWeight="700" fill="#1a1a1a" textAnchor="middle" dominantBaseline="middle">
            Deep Breathing
          </text>

          <g transform="translate(20 40)">
          <g stroke="#1a1a1a" strokeWidth="3" strokeLinejoin="round">
            <path d="M 20.00 420.00 A 380 380 0 0 1 28.30 340.99 L 292.40 397.13 A 110 110 0 0 0 290.00 420.00 Z" fill="url(#pat-angry)" />
            <path d="M 28.30 340.99 A 380 380 0 0 1 117.60 165.73 L 318.25 346.40 A 110 110 0 0 0 292.40 397.13 Z" fill="url(#pat-frustrated)" />
            <path d="M 167.77 210.90 A 312.5 312.5 0 0 1 263.01 139.13 L 351.78 321.13 A 110 110 0 0 0 318.25 346.40 Z" fill="url(#pat-excited)" />
            <path d="M 117.60 165.73 A 380 380 0 0 1 233.42 78.46 L 263.01 139.13 A 312.5 312.5 0 0 0 167.77 210.90 Z" fill="url(#pat-anxious)" />
            <path d="M 233.42 78.46 A 380 380 0 0 1 566.58 78.46 L 448.22 321.13 A 110 110 0 0 0 351.78 321.13 Z" fill="url(#pat-happy)" />
            <path d="M 566.58 78.46 A 380 380 0 0 1 707.43 196.64 L 488.99 355.34 A 110 110 0 0 0 448.22 321.13 Z" fill="url(#pat-calm)" />
            <path d="M 707.43 196.64 A 380 380 0 0 1 768.71 328.07 L 506.73 393.39 A 110 110 0 0 0 488.99 355.34 Z" fill="url(#pat-sadtired)" />
            <path d="M 768.71 328.07 A 380 380 0 0 1 780.00 420.00 L 510.00 420.00 A 110 110 0 0 0 506.73 393.39 Z" fill="url(#pat-upset)" />
          </g>

          <path
            d="M 217.64 46.10 A 416 416 0 0 1 582.36 46.10 L 570.09 71.27 A 388 388 0 0 0 229.91 71.27 Z"
            fill="url(#pat-banner)"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text x="400" y="18" fill="#ffffff" fontSize="17" fontWeight="700" textAnchor="middle" dominantBaseline="middle" letterSpacing="0.5">
            Creative Zone
          </text>

          <g fill="#1a1a1a" fontWeight="700" textAnchor="middle">
            <text x="156.34" y="394.39" fontSize="13" transform="rotate(-84 156.34 394.39)">Angry</text>
            <text x="181.70" y="308.77" fontSize="16" transform="rotate(-63 181.70 308.77)">Frustrated</text>
            <text x="272.87" y="251.29" fontSize="24" transform="rotate(-37 272.87 251.29)">Excited</text>
            <text x="191.62" y="143.47" fontSize="10" transform="rotate(-37 191.62 143.47)">Anxious</text>

            <text x="400" y="165" fontSize="30">Happy</text>
            <text x="400" y="191" fontSize="14" fontWeight="600">(Learning Zone)</text>

            <text x="567.77" y="220.06" fontSize="22" transform="rotate(40 567.77 220.06)">Calm</text>
            <text x="547.20" y="244.58" fontSize="12" fontWeight="600" transform="rotate(40 547.20 244.58)">Relaxed</text>

            <text x="636.55" y="309.70" fontSize="20" transform="rotate(65 636.55 309.70)">Sad</text>
            <text x="607.54" y="323.22" fontSize="20" transform="rotate(65 607.54 323.22)">Tired</text>

            <text x="643.17" y="390.14" fontSize="15" transform="rotate(83 643.17 390.14)">Upset</text>
          </g>
          </g>
        </svg>
      </div>
    </ModalShell>
  );
}
