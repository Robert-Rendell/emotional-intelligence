"use client";

import { useState } from "react";
import styles from "../EIDiagram.module.css";

type YouTubeEmbedProps = {
  src: string;
  title?: string;
};

export default function YouTubeEmbed({ src, title = "YouTube video player" }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.videoWrap}>
      {!loaded && (
        <div className={styles.videoSpinnerWrap}>
          <div className={styles.videoSpinner} role="status" aria-label="Loading video" />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
