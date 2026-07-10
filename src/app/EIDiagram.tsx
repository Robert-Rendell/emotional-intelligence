"use client";

import { useMemo, useState, type CSSProperties } from "react";
import styles from "./EIDiagram.module.css";

type Topic = {
  id: string;
  label: string;
  colorVar: string;
  description: string;
};

const TOPICS: Topic[] = [
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
    id: "awareness",
    label: "Awareness",
    colorVar: "--c-awareness",
    description:
      "Noticing your own emotions, triggers, and patterns of thought as they arise, not just after the fact.",
  },
  {
    id: "concentration",
    label: "Concentration",
    colorVar: "--c-concentration",
    description:
      "The capacity to direct attention deliberately and hold it there, even amid distraction.",
  },
  {
    id: "id-ego-superego",
    label: "Id - Ego - Superego",
    colorVar: "--c-idego",
    description:
      "Freud's model of the psyche: raw instinct, mediating reason, and internalized conscience in constant negotiation.",
  },
  {
    id: "sport-science",
    label: "Sport Science / Biology / Neurochemicals of Happiness",
    colorVar: "--c-sport",
    description:
      "How movement, physiology, and brain chemistry — dopamine, serotonin, endorphins — shape mood and wellbeing.",
  },
  {
    id: "open-mind",
    label: "Open mind / Education",
    colorVar: "--c-openmind",
    description:
      "Curiosity and a willingness to learn that keep the mind flexible, adaptable, and growing.",
  },
  {
    id: "overstimulation",
    label: "Overstimulation",
    colorVar: "--c-overstim",
    description:
      "The overwhelm that follows too much sensory, emotional, or cognitive input at once.",
  },
  {
    id: "regulation",
    label: "Emotional Regulation & Zones of Regulation",
    colorVar: "--c-regulation",
    description:
      "Frameworks and tools for recognizing which emotional zone you're in and steering back toward balance.",
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

function buildGeometry(): Geometry[] {
  const count = TOPICS.length;
  return TOPICS.map((topic, i) => {
    const angleDeg = -90 + (360 / count) * i;
    const angle = (angleDeg * Math.PI) / 180;
    const dir = { x: Math.cos(angle), y: Math.sin(angle) };

    const lines = wrapLabel(topic.label, 18);
    const longest = Math.max(...lines.map((l) => l.length));
    const boxW = Math.min(MAX_BOX_W, Math.max(MIN_BOX_W, longest * CHAR_W + PAD_X * 2));
    const boxH = lines.length * LINE_HEIGHT + PAD_Y * 2;

    const nodeCenter = {
      x: CENTER.x + dir.x * ARM_LENGTH,
      y: CENTER.y + dir.y * ARM_LENGTH,
    };

    // exact distance from node center to its rectangle boundary along -dir (toward hub)
    const halfW = boxW / 2 + 10;
    const halfH = boxH / 2 + 10;
    const denom = Math.max(Math.abs(dir.x) / halfW, Math.abs(dir.y) / halfH);
    const pullback = denom > 0 ? 1 / denom : 0;

    const arrowStart = {
      x: CENTER.x + dir.x * HUB_RADIUS,
      y: CENTER.y + dir.y * HUB_RADIUS,
    };
    const arrowEnd = {
      x: nodeCenter.x - dir.x * pullback,
      y: nodeCenter.y - dir.y * pullback,
    };

    const perp = { x: -dir.y, y: dir.x };
    const mid = {
      x: (arrowStart.x + arrowEnd.x) / 2 + perp.x * CURVE_OFFSET,
      y: (arrowStart.y + arrowEnd.y) / 2 + perp.y * CURVE_OFFSET,
    };

    const straight = Math.hypot(arrowEnd.x - arrowStart.x, arrowEnd.y - arrowStart.y);
    const pathLength = straight * 1.12;

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

export default function EIDiagram() {
  const geometry = useMemo(buildGeometry, []);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const activeId = pinnedId ?? hoverId;
  const activeTopic = TOPICS.find((t) => t.id === activeId) ?? null;

  const select = (id: string) => {
    setPinnedId((current) => (current === id ? null : id));
  };

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
          const isActive = activeId === topic.id;
          return (
            <g
              key={topic.id}
              className={`${styles.armGroup} ${isActive ? styles.active : ""}`}
              style={{ "--c": `var(${topic.colorVar})` } as CSSProperties}
              tabIndex={0}
              role="button"
              aria-pressed={pinnedId === topic.id}
              aria-label={`${topic.label}: ${topic.description}`}
              onMouseEnter={() => setHoverId(topic.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(topic.id)}
              onBlur={() => setHoverId(null)}
              onClick={() => select(topic.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(topic.id);
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

        <g className={`${styles.hub} ${styles.hubPulse}`}>
          <circle cx={CENTER.x} cy={CENTER.y} r={HUB_RADIUS} />
          <text x={CENTER.x} fontSize={30}>
            <tspan x={CENTER.x} y={CENTER.y - 12}>
              Emotional
            </tspan>
            <tspan x={CENTER.x} y={CENTER.y + 22}>
              Intelligence
            </tspan>
          </text>
        </g>
      </svg>

      <div className={styles.panel}>
        {activeTopic ? (
          <>
            <div className={styles.panelHeading}>
              <span
                className={styles.swatch}
                style={{ "--c": `var(${activeTopic.colorVar})` } as CSSProperties}
              />
              {activeTopic.label}
            </div>
            <p className={styles.panelBody}>{activeTopic.description}</p>
          </>
        ) : (
          <p className={styles.hint}>Hover or tap a topic to learn more. Click to pin it open.</p>
        )}
      </div>
    </div>
  );
}
