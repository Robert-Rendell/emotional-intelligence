"use client";

import type { RefObject } from "react";
import ModalShell from "./ModalShell";
import styles from "../EIDiagram.module.css";

const SITE_URL = "https://modern-emotional-intelligence.onrender.com/";

const QR_PATH =
  "M1 1.5h7m9 0h1m1 0h4m1 0h1m2 0h7M1 2.5h1m5 0h1m2 0h1m1 0h1m3 0h2m1 0h1m1 0h3m1 0h1m1 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m1 0h1m5 0h3m2 0h6m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m1 0h1m2 0h2m2 0h1m2 0h2m2 0h1m1 0h1m1 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h6m2 0h1m1 0h2m2 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m1 0h1m1 0h3m1 0h1m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m5 0h1M1 7.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M9 8.5h1m1 0h1m1 0h1m3 0h1m1 0h4M1 9.5h1m1 0h5m4 0h1m1 0h2m2 0h1m1 0h1m6 0h5M6 10.5h1m4 0h2m1 0h1m2 0h6m1 0h1m2 0h2m1 0h2m1 0h1M1 11.5h2m1 0h1m2 0h2m2 0h6m1 0h1m2 0h1m4 0h2m1 0h1m1 0h2M1 12.5h4m1 0h1m1 0h1m2 0h4m1 0h4m2 0h1m3 0h2m1 0h5M4 13.5h1m2 0h2m4 0h1m1 0h3m2 0h1m4 0h2m1 0h3m1 0h1M2 14.5h5m1 0h2m1 0h2m1 0h1m1 0h1m2 0h1m4 0h1m2 0h1m2 0h4M5 15.5h1m1 0h1m3 0h1m2 0h1m1 0h2m1 0h1m1 0h3m1 0h8M1 16.5h3m1 0h2m9 0h1m3 0h5m1 0h2m1 0h3M3 17.5h1m3 0h3m1 0h1m2 0h1m1 0h3m1 0h1m2 0h4m1 0h2m3 0h1M1 18.5h1m2 0h1m4 0h7m1 0h1m1 0h3m2 0h1m2 0h2m1 0h2m1 0h1M2 19.5h3m1 0h2m3 0h1m1 0h1m1 0h2m2 0h1m3 0h1m1 0h5m1 0h2M2 20.5h2m2 0h1m1 0h1m1 0h1m3 0h1m2 0h1m3 0h2m4 0h6M1 21.5h2m1 0h1m2 0h1m4 0h1m2 0h1m3 0h1m3 0h1m1 0h2m1 0h3m2 0h1M1 22.5h3m9 0h1m1 0h4m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m2 0h1M1 23.5h1m1 0h5m1 0h1m2 0h1m1 0h2m5 0h3m2 0h2m4 0h1M1 24.5h1m3 0h2m1 0h1m1 0h2m1 0h2m2 0h1m1 0h1m1 0h3m2 0h1m3 0h4M1 25.5h1m5 0h2m1 0h2m1 0h2m3 0h4m1 0h1m1 0h5M9 26.5h1m1 0h1m2 0h2m1 0h6m2 0h1m3 0h1m1 0h1m1 0h1M1 27.5h7m4 0h2m1 0h4m2 0h1m2 0h2m1 0h1m1 0h1m1 0h2M1 28.5h1m5 0h1m1 0h4m1 0h1m1 0h1m1 0h8m3 0h3M1 29.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h1m1 0h1m2 0h1m2 0h1m1 0h6m1 0h2M1 30.5h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h2m1 0h4m2 0h1m1 0h1m2 0h1m1 0h3M1 31.5h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h2m3 0h4m2 0h2m1 0h1M1 32.5h1m5 0h1m4 0h5m3 0h4m5 0h3M1 33.5h7m1 0h2m1 0h5m1 0h1m1 0h1m2 0h3m1 0h2m3 0h1";

type QRCodeModalProps = {
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function QRCodeModal({ onClose, closeButtonRef }: QRCodeModalProps) {
  return (
    <ModalShell title="Scan to Share" onClose={onClose} closeButtonRef={closeButtonRef}>
      <p className={styles.modalDescription}>
        Scan this code, or share the link, to open this site on another device.
      </p>
      <div className={styles.diagramWrap} style={{ maxWidth: 260, margin: "0 auto" }}>
        <svg viewBox="0 0 35 35" shapeRendering="crispEdges">
          <rect x={0} y={0} width={35} height={35} fill="#ffffff" />
          <path stroke="#000000" d={QR_PATH} />
        </svg>
      </div>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        <a
          className={styles.modalLink}
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {SITE_URL}
        </a>
      </p>
    </ModalShell>
  );
}
