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

const SUPEREGO_PATH =
  "M 217.0 20.0 L 220.6 28.7 L 229.5 37.4 L 240.9 46.1 L 252.0 54.7 L 259.9 63.4 L 262.0 72.1 L 263.1 80.8 L 265.2 89.5 L 267.9 98.2 L 270.7 106.8 L 273.1 115.5 L 274.7 124.2 L 275.1 132.9 L 276.6 141.6 L 279.3 150.3 L 282.6 158.9 L 285.7 167.6 L 288.1 176.3 L 289.0 185.0 L 145.0 185.0 L 145.9 176.3 L 148.3 167.6 L 151.4 158.9 L 154.7 150.3 L 157.4 141.6 L 158.9 132.9 L 159.3 124.2 L 160.9 115.5 L 163.3 106.8 L 166.1 98.2 L 168.8 89.5 L 170.9 80.8 L 172.0 72.1 L 174.1 63.4 L 182.0 54.7 L 193.1 46.1 L 204.5 37.4 L 213.4 28.7 L 217.0 20.0 Z";

const EGO_PATH =
  "M 289.0 185.0 L 290.2 195.3 L 293.3 205.7 L 297.5 216.0 L 302.3 226.3 L 306.7 236.7 L 310.2 247.0 L 311.9 257.3 L 312.4 267.7 L 314.2 278.0 L 316.9 288.3 L 320.1 298.7 L 323.3 309.0 L 326.2 319.3 L 328.2 329.7 L 329.0 340.0 L 105.0 340.0 L 105.8 329.7 L 107.8 319.3 L 110.7 309.0 L 113.9 298.7 L 117.1 288.3 L 119.8 278.0 L 121.6 267.7 L 122.1 257.3 L 123.8 247.0 L 127.3 236.7 L 131.7 226.3 L 136.5 216.0 L 140.7 205.7 L 143.8 195.3 L 145.0 185.0 Z";

const ID_PATH =
  "M 329.0 340.0 L 330.6 350.7 L 334.9 361.5 L 340.7 372.2 L 347.3 383.0 L 353.6 393.7 L 358.7 404.4 L 361.7 415.2 L 362.2 425.9 L 363.3 436.7 L 365.0 447.4 L 366.9 458.1 L 368.4 468.9 L 369.0 479.6 L 367.1 490.4 L 361.8 501.1 L 354.3 511.9 L 346.0 522.6 L 337.9 533.3 L 331.3 544.1 L 327.5 554.8 L 325.0 565.6 L 311.9 576.3 L 290.4 587.0 L 265.5 597.8 L 241.7 608.5 L 224.0 619.3 L 217.0 630.0 L 217.0 630.0 L 210.0 619.3 L 192.3 608.5 L 168.5 597.8 L 143.6 587.0 L 122.1 576.3 L 109.0 565.6 L 106.5 554.8 L 102.7 544.1 L 96.1 533.3 L 88.0 522.6 L 79.7 511.9 L 72.2 501.1 L 66.9 490.4 L 65.0 479.6 L 65.6 468.9 L 67.1 458.1 L 69.0 447.4 L 70.7 436.7 L 71.8 425.9 L 72.3 415.2 L 75.3 404.4 L 80.4 393.7 L 86.7 383.0 L 93.3 372.2 L 99.1 361.5 L 103.4 350.7 L 105.0 340.0 Z";

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
      <div className={`${styles.diagramWrap} ${styles.diagramWrapNarrow}`}>
        <svg viewBox="0 0 434 651" fontFamily="Arial, Helvetica, sans-serif">
          <rect x={0} y={0} width={434} height={651} fill="#a9ccd6" />
          <rect x={0} y={185} width={434} height={155} fill="#4a7f92" />
          <rect x={0} y={340} width={434} height={311} fill="#2f5a6d" />

          <path d={SUPEREGO_PATH} fill="#f2ead6" />
          <path d={EGO_PATH} fill="#6a9daa" />
          <path d={ID_PATH} fill="#2a4f5e" />

          <g textAnchor="middle">
            <text x={217} y={95} fontSize={28} fontWeight={800} fill="#1a2b33">
              Superego
            </text>
            <text x={217} y={125} fontSize={16} fontWeight={600} fill="#1a2b33">
              (Moral Compass)
            </text>
            <text
              x={217}
              y={150}
              fontSize={12}
              fontStyle="italic"
              letterSpacing={1}
              fill="#4a5a5f"
            >
              CONSCIOUS
            </text>

            <text x={217} y={245} fontSize={26} fontWeight={800} fill="#f5f0e6">
              Ego
            </text>
            <text x={217} y={272} fontSize={15} fontWeight={600} fill="#f5f0e6">
              (Mediator)
            </text>
            <text
              x={217}
              y={296}
              fontSize={12}
              fontStyle="italic"
              letterSpacing={1}
              fill="#d8e6ea"
            >
              SUBCONSCIOUS
            </text>

            <text x={217} y={460} fontSize={30} fontWeight={800} fill="#f5f0e6">
              Id
            </text>
            <text x={217} y={490} fontSize={16} fontWeight={600} fill="#f5f0e6">
              (Primal Desires)
            </text>
            <text
              x={217}
              y={514}
              fontSize={12}
              fontStyle="italic"
              letterSpacing={1}
              fill="#c3d8de"
            >
              INSTINCT
            </text>
          </g>
        </svg>
      </div>
    </ModalShell>
  );
}
