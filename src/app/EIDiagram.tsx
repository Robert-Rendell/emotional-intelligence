"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./EIDiagram.module.css";
import HubModal from "./modals/HubModal";
import RegulationModal from "./modals/RegulationModal";
import InflatedLifestyleModal from "./modals/InflatedLifestyleModal";
import SportScienceModal from "./modals/SportScienceModal";
import StretchingModal from "./modals/StretchingModal";
import DefaultTopicModal from "./modals/DefaultTopicModal";

export type Topic = {
  id: string;
  label: string;
  colorVar: string;
  description: string;
};

const TOPICS: Topic[] = [
  {
    id: "regulation",
    label: "Emotional Regulation & Zones of Regulation",
    colorVar: "--c-regulation",
    description:
      "Frameworks and tools for recognizing which emotional zone you're in and steering back toward balance.",
  },
  {
    id: "empathy",
    label: "Empathy",
    colorVar: "--c-empathy",
    description:
      "Sensing what other people feel and letting that understanding shape how you respond to them.",
  },
  {
    id: "morality",
    label: "Morality",
    colorVar: "--c-morality",
    description:
      "The values and principles that guide judgments of right and wrong, fair and unfair.",
  },
  {
    id: "overstimulation",
    label: "Overstimulation",
    colorVar: "--c-overstim",
    description:
      "The overwhelm that follows too much sensory, emotional, or cognitive input at once.",
  },
  {
    id: "suffering-is-relative",
    label: "Suffering is Relative",
    colorVar: "--c-suffering",
    description:
      "Pain and hardship are felt relative to expectation and comparison, not on some fixed, absolute scale.",
  },
  {
    id: "inflated-lifestyle",
    label: "Inflated Lifestyle",
    colorVar: "--c-inflated",
    description:
      "When spending, comfort, and expectations quietly climb to match income, closing the gap between what you have and what feels like enough.",
  },
  {
    id: "open-mind",
    label: "Open mind / Education",
    colorVar: "--c-openmind",
    description:
      "Curiosity and a willingness to learn that keep the mind flexible, adaptable, and growing.",
  },
  {
    id: "stretching",
    label: "Stretching",
    colorVar: "--c-stretch",
    description:
      "Deliberate lengthening and mobility work that releases tension and reconnects body and mind.",
  },
  {
    id: "id-ego-superego",
    label: "Id - Ego - Superego",
    colorVar: "--c-idego",
    description:
      "Freud's model of the psyche: raw instinct, mediating reason, and internalized conscience in constant negotiation.",
  },
  {
    id: "concentration",
    label: "Concentration",
    colorVar: "--c-concentration",
    description:
      "The capacity to direct attention deliberately and hold it there, even amid distraction.",
  },
  {
    id: "awareness",
    label: "Awareness",
    colorVar: "--c-awareness",
    description:
      "Noticing your own emotions, triggers, and patterns of thought as they arise, not just after the fact.",
  },
  {
    id: "sport-science",
    label: "Sport Science / Biology / Neurochemicals of Happiness",
    colorVar: "--c-sport",
    description:
      "How movement, physiology, and brain chemistry — dopamine, serotonin, endorphins — shape mood and wellbeing.",
  },
];

const VIEW_W = 1200;
const VIEW_H = 1060;
const CENTER = { x: VIEW_W / 2, y: VIEW_H / 2 };
const HUB_RADIUS = 108;
const ARM_LENGTH = 400;
const LINE_HEIGHT = 21;
const FONT_SIZE = 15.5;
const PAD_X = 20;
const PAD_Y = 16;
const MIN_BOX_W = 150;
const MAX_BOX_W = 236;
const CHAR_W = 8.1;
const CURVE_OFFSET = 46;

function wrapLabel(label: string, maxChars: number): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

type Geometry = {
  topic: Topic;
  lines: string[];
  boxW: number;
  boxH: number;
  nodeCenter: { x: number; y: number };
  arrowStart: { x: number; y: number };
  arrowEnd: { x: number; y: number };
  control: { x: number; y: number };
  pathLength: number;
};

// Rounded to avoid last-digit floating-point drift between the Math library used
// during server rendering and the one used client-side, which otherwise trips a
// React hydration mismatch even though the values are visually identical.
const round = (n: number) => Math.round(n * 100) / 100;
const roundPoint = (p: { x: number; y: number }) => ({ x: round(p.x), y: round(p.y) });

function buildGeometry(): Geometry[] {
  const count = TOPICS.length;
  return TOPICS.map((topic, i) => {
    const angleDeg = -90 + (360 / count) * i;
    const angle = (angleDeg * Math.PI) / 180;
    const dir = { x: Math.cos(angle), y: Math.sin(angle) };

    const lines = wrapLabel(topic.label, 18);
    const longest = Math.max(...lines.map((l) => l.length));
    const boxW = round(Math.min(MAX_BOX_W, Math.max(MIN_BOX_W, longest * CHAR_W + PAD_X * 2)));
    const boxH = round(lines.length * LINE_HEIGHT + PAD_Y * 2);

    const nodeCenter = roundPoint({
      x: CENTER.x + dir.x * ARM_LENGTH,
      y: CENTER.y + dir.y * ARM_LENGTH,
    });

    // exact distance from node center to its rectangle boundary along -dir (toward hub)
    const halfW = boxW / 2 + 10;
    const halfH = boxH / 2 + 10;
    const denom = Math.max(Math.abs(dir.x) / halfW, Math.abs(dir.y) / halfH);
    const pullback = denom > 0 ? 1 / denom : 0;

    const arrowStart = roundPoint({
      x: CENTER.x + dir.x * HUB_RADIUS,
      y: CENTER.y + dir.y * HUB_RADIUS,
    });
    const arrowEnd = roundPoint({
      x: nodeCenter.x - dir.x * pullback,
      y: nodeCenter.y - dir.y * pullback,
    });

    const perp = { x: -dir.y, y: dir.x };
    const mid = roundPoint({
      x: (arrowStart.x + arrowEnd.x) / 2 + perp.x * CURVE_OFFSET,
      y: (arrowStart.y + arrowEnd.y) / 2 + perp.y * CURVE_OFFSET,
    });

    const straight = Math.hypot(arrowEnd.x - arrowStart.x, arrowEnd.y - arrowStart.y);
    const pathLength = round(straight * 1.12);

    return {
      topic,
      lines,
      boxW,
      boxH,
      nodeCenter,
      arrowStart,
      arrowEnd,
      control: mid,
      pathLength,
    };
  });
}

type ModalTarget = { kind: "topic"; id: string } | { kind: "hub" };

export default function EIDiagram() {
  const geometry = useMemo(buildGeometry, []);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalTarget | null>(null);
  const lastTriggerRef = useRef<SVGElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const modalTopic = modal?.kind === "topic" ? TOPICS.find((t) => t.id === modal.id) ?? null : null;
  const isHubModal = modal?.kind === "hub";
  const modalKey = modal ? (modal.kind === "hub" ? "hub" : modal.id) : null;

  const openModal = (target: ModalTarget, trigger: SVGElement) => {
    lastTriggerRef.current = trigger;
    setModal(target);
  };

  const closeModal = () => {
    setModal(null);
    lastTriggerRef.current?.focus();
  };

  useEffect(() => {
    if (!modalKey) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalKey]);

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.figure}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Mind map of Emotional Intelligence and its component topics"
      >
        {geometry.map(({ topic, arrowStart, arrowEnd, control, pathLength }, i) => (
          <path
            key={`arrow-${topic.id}`}
            className={`${styles.arrow} ${styles.arrowDraw}`}
            style={
              {
                "--c": `var(${topic.colorVar})`,
                "--delay": `${300 + i * 90}ms`,
                "--len": pathLength,
                strokeDasharray: pathLength,
              } as CSSProperties
            }
            d={`M ${arrowStart.x},${arrowStart.y} Q ${control.x},${control.y} ${arrowEnd.x},${arrowEnd.y}`}
            markerEnd={`url(#arrowhead-${topic.id})`}
          />
        ))}

        <defs>
          {TOPICS.map((topic) => (
            <marker
              key={`marker-${topic.id}`}
              id={`arrowhead-${topic.id}`}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="7.5"
              markerHeight="7.5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: `var(${topic.colorVar})` }} />
            </marker>
          ))}
        </defs>

        {geometry.map(({ topic, lines, boxW, boxH, nodeCenter }, i) => {
          const isActive = hoverId === topic.id;
          return (
            <g
              key={topic.id}
              className={`${styles.armGroup} ${isActive ? styles.active : ""}`}
              style={{ "--c": `var(${topic.colorVar})` } as CSSProperties}
              tabIndex={0}
              role="button"
              aria-haspopup="dialog"
              aria-label={`${topic.label}: ${topic.description}`}
              onMouseEnter={() => setHoverId(topic.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(topic.id)}
              onBlur={() => setHoverId(null)}
              onClick={(e) => openModal({ kind: "topic", id: topic.id }, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal({ kind: "topic", id: topic.id }, e.currentTarget);
                }
              }}
            >
              <g
                className={styles.nodeGroup}
                style={{ "--delay": `${900 + i * 70}ms` } as CSSProperties}
              >
                <rect
                  className={styles.nodeBox}
                  x={nodeCenter.x - boxW / 2}
                  y={nodeCenter.y - boxH / 2}
                  width={boxW}
                  height={boxH}
                  rx={16}
                />
                <text className={styles.label} fontSize={FONT_SIZE} x={nodeCenter.x}>
                  {lines.map((line, li) => (
                    <tspan
                      key={li}
                      x={nodeCenter.x}
                      y={nodeCenter.y - ((lines.length - 1) * LINE_HEIGHT) / 2 + li * LINE_HEIGHT}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            </g>
          );
        })}

        <g
          className={`${styles.hub} ${styles.hubPulse}`}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label="Emotional Intelligence (E.Q): compare IQ and EQ"
          onClick={(e) => openModal({ kind: "hub" }, e.currentTarget)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openModal({ kind: "hub" }, e.currentTarget);
            }
          }}
        >
          <circle cx={CENTER.x} cy={CENTER.y} r={HUB_RADIUS} />
          <text x={CENTER.x} fontSize={30}>
            <tspan x={CENTER.x} y={CENTER.y - 26}>
              Emotional
            </tspan>
            <tspan x={CENTER.x} y={CENTER.y + 8}>
              Intelligence
            </tspan>
            <tspan x={CENTER.x} y={CENTER.y + 34} fontSize={17} className={styles.hubSub}>
              (E.Q)
            </tspan>
          </text>
        </g>
      </svg>

      {isHubModal ? (
        <HubModal onClose={closeModal} closeButtonRef={closeButtonRef} />
      ) : modalTopic ? (
        modalTopic.id === "regulation" ? (
          <RegulationModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "inflated-lifestyle" ? (
          <InflatedLifestyleModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "sport-science" ? (
          <SportScienceModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "stretching" ? (
          <StretchingModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : (
          <DefaultTopicModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        )
      ) : null}
    </div>
  );
}
