"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type IdEgoSuperegoModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

const PEAK_PATH =
  "M 236,150 L 255,175 L 275,165 L 295,200 L 330,195 L 360,225 L 395,238 L 145,238 L 170,225 L 160,195 L 185,180 L 200,160 L 215,170 L 225,155 Z";

const SUPEREGO_PATH =
  "M 145,238 L 120,260 L 100,285 L 85,310 L 95,335 L 80,360 L 90,385 L 75,410 L 85,435 L 100,460 L 120,485 L 140,505 L 165,525 L 190,545 L 215,565 L 238,580 L 238,238 Z";

const EGO_PATH = "M 238,238 L 395,238 L 390,250 L 395,275 L 390,300 L 392,330 L 238,330 Z";

const ID_PATH =
  "M 238,330 L 392,330 L 390,350 L 385,375 L 375,398 L 365,422 L 350,445 L 340,468 L 325,490 L 310,510 L 295,530 L 275,548 L 255,565 L 238,580 Z";

const SUN_PATH =
  "M 462,80 L 446,91 L 450,110 L 431,106 L 420,122 L 409,106 L 390,110 L 394,91 L 378,80 L 394,69 L 390,50 L 409,54 L 420,38 L 431,54 L 450,50 L 446,69 Z";

const WATER_PATH =
  "M 0,240 Q 30,225 60,240 T 120,240 T 180,240 T 240,240 T 300,240 T 360,240 T 420,240 T 486,240 L 486,600 L 0,600 Z";

const ICEBERG_STROKE = "#2b3a42";

const JUNG_BG = "#3b4b58";
const JUNG_TEXT = "#eef3f6";
const JUNG_TEXT_MUTED = "#c3ced6";

export default function IdEgoSuperegoModal({
  topic,
  onClose,
  closeButtonRef,
}: IdEgoSuperegoModalProps) {
  return (
    <ModalShell
      title={topic.label}
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      colorVar={topic.colorVar}
    >
      <p className={styles.modalDescription}>{topic.description}</p>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Freud&apos;s model</h3>
        <div className={`${styles.diagramWrap} ${styles.diagramWrapNarrow}`}>
          <svg viewBox="0 0 486 600" fontFamily="Arial, Helvetica, sans-serif">
            <rect x={0} y={0} width={486} height={600} fill="#cfe2f3" />
            <path d={WATER_PATH} fill="#86b6d8" />
            <path d={SUN_PATH} fill="#f6dd6a" />

            <path d={PEAK_PATH} fill="#ffffff" stroke={ICEBERG_STROKE} strokeWidth={2} strokeLinejoin="round" />
            <line x1={237} y1={150} x2={238} y2={238} stroke={ICEBERG_STROKE} strokeWidth={2} />

            <path d={SUPEREGO_PATH} fill="#9dc3de" stroke={ICEBERG_STROKE} strokeWidth={2} strokeLinejoin="round" />
            <path d={EGO_PATH} fill="#9dc3de" stroke={ICEBERG_STROKE} strokeWidth={2} strokeLinejoin="round" />
            <path d={ID_PATH} fill="#9dc3de" stroke={ICEBERG_STROKE} strokeWidth={2} strokeLinejoin="round" />

            <text x={40} y={55} fontSize={22} fontStyle="italic" fill="#1a2733">
              Conscious
            </text>
            <text x={40} y={470} fontSize={22} fontStyle="italic" fill="#1a2733">
              Unconscious
            </text>

            <text x={315} y={290} fontSize={24} fontWeight={700} textAnchor="middle" fill="#16232b">
              Ego
            </text>
            <text x={168} y={345} fontSize={24} fontWeight={700} textAnchor="middle" fill="#16232b">
              Superego
            </text>
            <text x={313} y={392} fontSize={24} fontWeight={700} textAnchor="middle" fill="#16232b">
              Id
            </text>
          </svg>
        </div>
      </div>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Jung&apos;s model</h3>
        <div className={`${styles.diagramWrap} ${styles.diagramWrapNarrow}`}>
          <svg viewBox="0 0 486 700" fontFamily="Arial, Helvetica, sans-serif">
            <rect x={0} y={0} width={486} height={700} fill={JUNG_BG} />

            <text x={243} y={28} fontSize={13} fontWeight={700} letterSpacing={3} textAnchor="middle" fill={JUNG_TEXT_MUTED}>
              CARL JUNG EXPLAINED
            </text>
            <text x={243} y={62} fontSize={28} fontWeight={800} textAnchor="middle" fill={JUNG_TEXT}>
              Model of the Psyche
            </text>

            <circle cx={243} cy={410} r={230} fill="none" stroke={JUNG_TEXT} strokeWidth={2} />
            <circle cx={243} cy={330} r={150} fill="#8fa3b0" fillOpacity={0.55} />
            <circle cx={243} cy={490} r={150} fill="#0f1c24" fillOpacity={0.55} />

            <g textAnchor="middle" fill={JUNG_TEXT}>
              <text x={243} y={215} fontSize={16} fontWeight={700} letterSpacing={2}>
                CONSCIOUS
              </text>
              <text x={243} y={250} fontSize={19} fontWeight={700}>
                Ego
              </text>
              <text x={243} y={270} fontSize={14} fill={JUNG_TEXT_MUTED}>
                (conscious &apos;I&apos;)
              </text>
              <text x={243} y={298} fontSize={19} fontWeight={700}>
                Persona
              </text>
              <text x={243} y={318} fontSize={14} fill={JUNG_TEXT_MUTED}>
                (social mask)
              </text>

              <text x={243} y={390} fontSize={16} fontWeight={700} letterSpacing={2}>
                PERSONAL
              </text>
              <text x={243} y={412} fontSize={16} fontWeight={700} letterSpacing={2}>
                UNCONSCIOUS
              </text>
              <text x={243} y={442} fontSize={19} fontWeight={700}>
                Shadow
              </text>
              <text x={243} y={466} fontSize={19} fontWeight={700}>
                Complexes
              </text>

              <text x={243} y={525} fontSize={16} fontWeight={700} letterSpacing={2}>
                COLLECTIVE
              </text>
              <text x={243} y={547} fontSize={16} fontWeight={700} letterSpacing={2}>
                UNCONSCIOUS
              </text>
              <text x={243} y={580} fontSize={19} fontWeight={700}>
                Archetypes, symbols
              </text>
              <text x={243} y={605} fontSize={19} fontWeight={700}>
                Anima &amp; animus
              </text>
            </g>

            <text
              x={445}
              y={410}
              fontSize={15}
              fontWeight={700}
              letterSpacing={2}
              textAnchor="middle"
              fill={JUNG_TEXT}
              transform="rotate(-90 445 410)"
            >
              THE SELF
            </text>
            <text
              x={478}
              y={410}
              fontSize={12}
              fontStyle="italic"
              textAnchor="middle"
              fill={JUNG_TEXT_MUTED}
              transform="rotate(-90 478 410)"
            >
              = totality of the psyche
            </text>
          </svg>
        </div>
      </div>
    </ModalShell>
  );
}
