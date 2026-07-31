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

      <hr className={styles.modalDivider} />

      <div className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Ego Disassociation</h3>
        <p className={styles.modalDescription}>
          Ego disassociation is the practice of loosening identification with the ego (the
          &ldquo;I-maker&rdquo;, or <em>ahamkara</em>) &mdash; the part of the mind that claims
          ownership of thoughts, actions, and outcomes. The Bhagavad Gita, the Dhammapada, and
          the Upanishads each describe a piece of this, and read together they sketch out a rough
          sequence:
        </p>
        <ol className={styles.modalOrderedList}>
          <li>
            <strong>Recognize the doer-illusion</strong> &mdash; the Bhagavad Gita (3.27) teaches
            that all actions are carried out by the gunas (qualities) of nature, while the
            ego-deluded mind thinks &ldquo;I am the doer.&rdquo; Disassociation starts with
            noticing that habit: the ego claiming credit and ownership over everything that
            happens.
          </li>
          <li>
            <strong>Act without attachment to results</strong> &mdash; the Gita&apos;s
            best-known verse (2.47) holds that you have a right to your actions but never to
            their fruits. Practicing action without craving a particular outcome
            (<em>nishkama karma</em>) loosens the ego&apos;s grip, since most of its anxiety
            comes from needing things to turn out a specific way.
          </li>
          <li>
            <strong>Stop claiming ownership</strong> &mdash; the Dhammapada (62) pushes further:
            &ldquo;&lsquo;Sons have I, wealth have I&rsquo;: so the fool troubles himself. He is
            not even his own &mdash; how much less sons, how much less wealth?&rdquo; It
            questions not just ownership of outcomes but the idea that anything, including the
            body and mind, belongs to a fixed &ldquo;I&rdquo;.
          </li>
          <li>
            <strong>Negate every false identification</strong> &mdash; the Upanishads
            (Brihadaranyaka Upanishad) describe this with <em>neti neti</em>, &ldquo;not this,
            not this&rdquo;: stripping away every label the ego clings to &mdash; body, role,
            personality, name &mdash; none of which is the true Self.
          </li>
          <li>
            <strong>Recognize what remains</strong> &mdash; once the false identifications are
            negated, the Chandogya Upanishad (6.8.7) names what&apos;s left with
            <em> tat tvam asi</em>, &ldquo;thou art that&rdquo;: identity with the ultimate
            reality, not the small, defensive ego.
          </li>
          <li>
            <strong>Conquer the self, not others</strong> &mdash; the Dhammapada (103) puts it
            plainly: &ldquo;Though one may conquer a thousand times a thousand men in battle, yet
            he indeed is the noblest victor who conquers himself.&rdquo; The real contest was
            always internal.
          </li>
          <li>
            <strong>Settle into steady wisdom</strong> &mdash; the Gita (2.55&ndash;57) describes
            the resulting state as <em>sthitaprajna</em>, &ldquo;steady wisdom&rdquo;: someone
            who has given up desires born of mental imagining, is undisturbed by sorrow,
            unexcited by pleasure, and free of fear and anger.
          </li>
        </ol>
        <p className={styles.modalNote}>
          These are three independent bodies of scripture, not one unified system &mdash; the
          sequence above is a synthesis for the purpose of this mind-map, not a step list any
          single text lays out start to finish.
        </p>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>What it feels like, before and after</h4>
        <div className={styles.modalLevelGroup}>
          <div className={styles.modalLevelCard}>
            <h4 className={styles.modalSectionTitle}>Identified with the ego</h4>
            <p className={styles.modalDescription} style={{ marginBottom: 0 }}>
              Every compliment lands as validation and every criticism as an attack, because
              &ldquo;you&rdquo; feels inseparable from your reputation, performance, and
              possessions. Thoughts loop around comparison &mdash; better than, worse than
              &mdash; and ordinary setbacks feel like threats to your existence rather than
              events that just happened.
            </p>
          </div>
          <div className={styles.modalLevelCard}>
            <h4 className={styles.modalSectionTitle}>Disassociated from the ego</h4>
            <p className={styles.modalDescription} style={{ marginBottom: 0 }}>
              Praise and blame still register, but they land on the ego rather than on
              &ldquo;you&rdquo; &mdash; there&apos;s a witnessing awareness a half-step back from
              the reaction. Outcomes matter less than the quality of the action itself, and
              setbacks are inconvenient rather than existential.
            </p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
