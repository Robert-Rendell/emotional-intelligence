"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./EIDiagram.module.css";
import { TOPICS, type Topic } from "./topics";

export type { Topic };
import HubModal from "./modals/HubModal";
import QRCodeModal from "./modals/QRCodeModal";
import RegulationModal from "./modals/RegulationModal";
import InflatedLifestyleModal from "./modals/InflatedLifestyleModal";
import SportScienceModal from "./modals/SportScienceModal";
import StretchingModal from "./modals/StretchingModal";
import OpenMindModal from "./modals/OpenMindModal";
import IdEgoSuperegoModal from "./modals/IdEgoSuperegoModal";
import ConcentrationModal from "./modals/ConcentrationModal";
import AwarenessModal from "./modals/AwarenessModal";
import MotivationModal from "./modals/MotivationModal";
import EmpathyModal from "./modals/EmpathyModal";
import OverstimulationModal from "./modals/OverstimulationModal";
import MoralityModal from "./modals/MoralityModal";
import DefaultTopicModal from "./modals/DefaultTopicModal";

const VIEW_W = 1300;
const VIEW_H = 1160;
const CENTER = { x: VIEW_W / 2, y: VIEW_H / 2 };
const HUB_RADIUS = 130;
const ARM_LENGTH = 480;
const LINE_HEIGHT = 25;
const FONT_SIZE = 18.5;
const PAD_X = 24;
const PAD_Y = 19;
const MIN_BOX_W = 180;
const MAX_BOX_W = 283;
const CHAR_W = 9.7;
const CURVE_OFFSET = 55;

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

type ModalTarget = { kind: "topic"; id: string } | { kind: "hub" } | { kind: "qr" };

type EIDiagramProps = {
  initialTopicId?: string;
};

export default function EIDiagram({ initialTopicId }: EIDiagramProps) {
  const geometry = useMemo(buildGeometry, []);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalTarget | null>(null);
  const [autoHighlight, setAutoHighlight] = useState(true);
  const lastTriggerRef = useRef<SVGElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const IDLE_RESUME_MS = 3000;

  const stopAutoHighlight = () => {
    setAutoHighlight(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setAutoHighlight(true), IDLE_RESUME_MS);
  };

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (initialTopicId && TOPICS.some((t) => t.id === initialTopicId)) {
      setModal({ kind: "topic", id: initialTopicId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync modal state with the URL using the raw History API rather than
  // Next's router: pushing through next/navigation would swap in the
  // separate `/[topic]` route and remount this whole component, replaying
  // every entrance animation and looking like a full page refresh.
  useEffect(() => {
    const onPopState = () => {
      const id = window.location.pathname.replace(/^\//, "");
      if (id && TOPICS.some((t) => t.id === id)) {
        setModal({ kind: "topic", id });
      } else {
        setModal(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const modalTopic = modal?.kind === "topic" ? TOPICS.find((t) => t.id === modal.id) ?? null : null;
  const isHubModal = modal?.kind === "hub";
  const isQrModal = modal?.kind === "qr";
  const modalKey = modal ? (modal.kind === "topic" ? modal.id : modal.kind) : null;

  const openModal = (target: ModalTarget, trigger: SVGElement) => {
    lastTriggerRef.current = trigger;
    setModal(target);
    const path = target.kind === "topic" ? `/${target.id}` : "/";
    if (window.location.pathname !== path) window.history.pushState(null, "", path);
  };

  const closeModal = () => {
    setModal(null);
    lastTriggerRef.current?.focus();
    if (window.location.pathname !== "/") window.history.pushState(null, "", "/");
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
    <div className={`${styles.wrap} ${autoHighlight ? styles.autoHighlight : ""}`}>
      <div className={styles.pinchHint} aria-hidden="true">
        <span className={styles.pinchIcon}>
          <span className={styles.pinchDot} />
          <span className={styles.pinchDot} />
        </span>
        Pinch to zoom
      </div>
      <svg
        className={styles.figure}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Mind map of Emotional Intelligence and its component topics"
      >
        <rect
          x={24}
          y={24}
          width={VIEW_W - 48}
          height={VIEW_H - 48}
          rx={32}
          fill="none"
          stroke="var(--ink-faint)"
          strokeWidth={3}
        />
        <g
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label="Concentration: The capacity to direct attention deliberately and hold it there, even amid distraction."
          className={styles.iconButton}
          style={{ cursor: "pointer" }}
          onMouseEnter={stopAutoHighlight}
          onFocus={stopAutoHighlight}
          onClick={(e) => {
            stopAutoHighlight();
            openModal({ kind: "topic", id: "concentration" }, e.currentTarget);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              stopAutoHighlight();
              openModal({ kind: "topic", id: "concentration" }, e.currentTarget);
            }
          }}
        >
          <rect x={58} y={9} width={190} height={30} rx={15} fill="var(--surface)" stroke="var(--ink-faint)" strokeWidth={2.5} />
          <text x={153} y={24} fontSize={16} fontWeight={700} fill="var(--ink-faint)" textAnchor="middle" dominantBaseline="middle">
            Deep Breathing
          </text>
        </g>
        <g
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label="Open QR code to share this site"
          className={styles.iconButton}
          style={{ cursor: "pointer" }}
          onMouseEnter={stopAutoHighlight}
          onFocus={stopAutoHighlight}
          onClick={(e) => {
            stopAutoHighlight();
            openModal({ kind: "qr" }, e.currentTarget);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              stopAutoHighlight();
              openModal({ kind: "qr" }, e.currentTarget);
            }
          }}
        >
          <rect x={1224} y={1074} width={36} height={36} rx={8} fill="var(--surface)" />
          <g fill="none" stroke="var(--ink-faint)" strokeWidth={1.5}>
            <rect x={1230} y={1080} width={8} height={8} />
            <rect x={1246} y={1080} width={8} height={8} />
            <rect x={1230} y={1096} width={8} height={8} />
          </g>
          <g fill="var(--ink-faint)">
            <rect x={1233} y={1083} width={2} height={2} />
            <rect x={1249} y={1083} width={2} height={2} />
            <rect x={1233} y={1099} width={2} height={2} />
            <rect x={1246} y={1096} width={2} height={2} />
            <rect x={1250} y={1100} width={2} height={2} />
            <rect x={1242} y={1092} width={2} height={2} />
          </g>
        </g>
        <text
          x={VIEW_W - 40}
          y={VIEW_H - 36}
          fontSize={13}
          fill="var(--ink-faint)"
          textAnchor="end"
        >
          Copyright &copy; Robert Rendell 2026
        </text>

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
              onMouseEnter={() => {
                setHoverId(topic.id);
                stopAutoHighlight();
              }}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => {
                setHoverId(topic.id);
                stopAutoHighlight();
              }}
              onBlur={() => setHoverId(null)}
              onClick={(e) => {
                stopAutoHighlight();
                openModal({ kind: "topic", id: topic.id }, e.currentTarget);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  stopAutoHighlight();
                  openModal({ kind: "topic", id: topic.id }, e.currentTarget);
                }
              }}
            >
              <g
                className={styles.nodeGroup}
                style={{ "--delay": `${900 + i * 70}ms` } as CSSProperties}
              >
                <g
                  className={styles.nodePulse}
                  style={
                    { "--highlight-delay": `${(i * 10800) / geometry.length}ms` } as CSSProperties
                  }
                >
                  <rect
                    className={styles.nodeBox}
                    x={nodeCenter.x - boxW / 2}
                    y={nodeCenter.y - boxH / 2}
                    width={boxW}
                    height={boxH}
                    rx={19}
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
            </g>
          );
        })}

        <g
          className={`${styles.hub} ${styles.hubPulse}`}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label="Emotional Intelligence (E.Q): compare IQ and EQ"
          onMouseEnter={stopAutoHighlight}
          onFocus={stopAutoHighlight}
          onClick={(e) => {
            stopAutoHighlight();
            openModal({ kind: "hub" }, e.currentTarget);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              stopAutoHighlight();
              openModal({ kind: "hub" }, e.currentTarget);
            }
          }}
        >
          <circle cx={CENTER.x} cy={CENTER.y} r={HUB_RADIUS} />
          <text x={CENTER.x} fontSize={36}>
            <tspan x={CENTER.x} y={CENTER.y - 31}>
              Emotional
            </tspan>
            <tspan x={CENTER.x} y={CENTER.y + 10}>
              Intelligence
            </tspan>
            <tspan x={CENTER.x} y={CENTER.y + 41} fontSize={20} className={styles.hubSub}>
              (E.Q)
            </tspan>
          </text>
        </g>
      </svg>

      {isHubModal ? (
        <HubModal onClose={closeModal} closeButtonRef={closeButtonRef} />
      ) : isQrModal ? (
        <QRCodeModal onClose={closeModal} closeButtonRef={closeButtonRef} />
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
        ) : modalTopic.id === "open-mind" ? (
          <OpenMindModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "id-ego-superego" ? (
          <IdEgoSuperegoModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "concentration" ? (
          <ConcentrationModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "awareness" ? (
          <AwarenessModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "motivation" ? (
          <MotivationModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "empathy" ? (
          <EmpathyModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "overstimulation" ? (
          <OverstimulationModal
            topic={modalTopic}
            onClose={closeModal}
            closeButtonRef={closeButtonRef}
          />
        ) : modalTopic.id === "morality" ? (
          <MoralityModal
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
