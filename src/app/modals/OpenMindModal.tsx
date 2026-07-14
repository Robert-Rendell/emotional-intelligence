"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";
import type { Topic } from "../EIDiagram";

type OpenMindModalProps = {
  topic: Topic;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

const LEVELS = [
  {
    key: "create",
    label: "CREATE",
    heading: "Produce new or original work",
    sub: "Design, assemble, construct, conjecture, develop, formulate, author, investigate",
    color: "#e0555a",
    tint: "#f7d9da",
    path: "M 180.0 70.0 L 240.0 70.0 L 260.0 123.3 L 160.0 123.3 Z",
    boxLeft: 276.0,
    boxTop: 73.0,
    midY: 96.7,
  },
  {
    key: "evaluate",
    label: "EVALUATE",
    heading: "Justify a stand or decision",
    sub: "Appraise, argue, defend, judge, select, support, value, critique, weigh",
    color: "#f0a13c",
    tint: "#fbe6cc",
    path: "M 160.0 123.3 L 260.0 123.3 L 280.0 176.7 L 140.0 176.7 Z",
    boxLeft: 296.0,
    boxTop: 126.3,
    midY: 150.0,
  },
  {
    key: "analyse",
    label: "ANALYSE",
    heading: "Draw connections among ideas",
    sub: "Differentiate, organise, relate, compare, contrast, distinguish, examine, experiment, question, test",
    color: "#f2cf52",
    tint: "#faf1d0",
    path: "M 140.0 176.7 L 280.0 176.7 L 300.0 230.0 L 120.0 230.0 Z",
    boxLeft: 316.0,
    boxTop: 179.7,
    midY: 203.3,
  },
  {
    key: "apply",
    label: "APPLY",
    heading: "Use information in new situation",
    sub: "Execute, implement, solve, use, demonstrate, interpret, operate, schedule, sketch",
    color: "#4caf7d",
    tint: "#d9f0e2",
    path: "M 120.0 230.0 L 300.0 230.0 L 320.0 283.3 L 100.0 283.3 Z",
    boxLeft: 336.0,
    boxTop: 233.0,
    midY: 256.7,
  },
  {
    key: "understand",
    label: "UNDERSTAND",
    heading: "Explain ideas or concepts",
    sub: "Classify, describe, discuss, explain, identify, locate, recognize, report, select, translate",
    color: "#4fb8e0",
    tint: "#d7f0f9",
    path: "M 100.0 283.3 L 320.0 283.3 L 340.0 336.7 L 80.0 336.7 Z",
    boxLeft: 356.0,
    boxTop: 286.3,
    midY: 310.0,
  },
  {
    key: "remember",
    label: "REMEMBER",
    heading: "Recall facts and basic concepts",
    sub: "Define, duplicate, list, memorise, repeat, state",
    color: "#3d7dca",
    tint: "#d7e6f7",
    path: "M 80.0 336.7 L 340.0 336.7 L 360.0 390.0 L 60.0 390.0 Z",
    boxLeft: 376.0,
    boxTop: 339.7,
    midY: 363.3,
  },
];

const BOX_RIGHT = 870;
const BOX_HEIGHT = 47.3;

export default function OpenMindModal({ topic, onClose, closeButtonRef }: OpenMindModalProps) {
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
        <svg viewBox="0 0 900 460" fontFamily="Arial, Helvetica, sans-serif">
          <text x={450} y={35} fontSize={26} fontWeight={800} fill="#1a1a1a" textAnchor="middle">
            Bloom&rsquo;s Taxonomy
          </text>

          {LEVELS.map((lvl) => (
            <g key={lvl.key}>
              <path d={lvl.path} fill={lvl.color} stroke="#1a1a1a" strokeWidth={1.5} />
              <text
                x={210}
                y={lvl.midY}
                fontSize={13}
                fontWeight={800}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {lvl.label}
              </text>

              <rect
                x={lvl.boxLeft}
                y={lvl.boxTop}
                width={BOX_RIGHT - lvl.boxLeft}
                height={BOX_HEIGHT}
                rx={6}
                fill={lvl.tint}
              />
              <text x={lvl.boxLeft + 12} y={lvl.boxTop + 18} fontSize={13} fontWeight={800} fill="#1a1a1a">
                {lvl.heading}
              </text>
              <text x={lvl.boxLeft + 12} y={lvl.boxTop + 35} fontSize={10.5} fill="#3a3a3a">
                {lvl.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </ModalShell>
  );
}
