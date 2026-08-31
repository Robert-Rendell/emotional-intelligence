import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STROKE = "#0b0b0b";
const BLUE = "#2a5ed4";
const ORANGE = "#e8871e";
const SURFACE = "#fcfcfb";

// satori (next/og) can't render <text> inside a raw <svg> pass-through, so the
// diagram's labels are positioned as absolute HTML text on top of a shapes-only
// SVG, using the same viewBox->canvas scale/offset as the SVG itself.
function Label({
  x,
  y,
  fontSize,
  children,
  align = "start",
  color = STROKE,
  weight = 400,
  rotate,
}: {
  x: number;
  y: number;
  fontSize: number;
  children: string;
  align?: "start" | "middle" | "end";
  color?: string;
  weight?: number;
  rotate?: number;
}) {
  const translateX = align === "middle" ? "-50%" : align === "end" ? "-100%" : "0%";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - fontSize * 0.8,
        fontSize,
        fontWeight: weight,
        color,
        fontFamily: "Arial, Helvetica, sans-serif",
        transform: rotate !== undefined ? `translateX(${translateX}) rotate(${rotate}deg)` : `translateX(${translateX})`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

export default function OpengraphImage() {
  const scale = 630 / 760;
  const offsetX = (1200 - 630) / 2;
  const originY = 60;
  const px = (x: number) => offsetX + x * scale;
  const py = (y: number) => (y - originY) * scale;
  const fs = (n: number) => n * scale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: SURFACE,
        }}
      >
        <svg
          width={630}
          height={630}
          viewBox="0 60 760 760"
          style={{ position: "absolute", left: offsetX, top: 0 }}
        >
          <rect x={0} y={0} width={760} height={820} fill={SURFACE} />
          <defs>
            <marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill={STROKE} />
            </marker>
            <marker id="at" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill={STROKE} />
            </marker>
            <marker id="ab" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill={BLUE} />
            </marker>
            <marker id="ao" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill={ORANGE} />
            </marker>
          </defs>

          <line x1={80} y1={300} x2={25} y2={225} stroke={STROKE} strokeWidth={3} markerEnd="url(#a)" />
          <line x1={80} y1={300} x2={80} y2={220} stroke={STROKE} strokeWidth={3} markerEnd="url(#a)" />
          <line x1={80} y1={300} x2={40} y2={360} stroke={STROKE} strokeWidth={2.5} markerEnd="url(#a)" />
          <line x1={80} y1={300} x2={725} y2={300} stroke={STROKE} strokeWidth={5} markerEnd="url(#at)" />

          <circle cx={403} cy={300} r={22} fill="none" stroke={BLUE} strokeWidth={3} />
          <line x1={363} y1={150} x2={397} y2={279} stroke={BLUE} strokeWidth={3} markerEnd="url(#ab)" />
          <line x1={563} y1={140} x2={543} y2={296} stroke={BLUE} strokeWidth={3} markerEnd="url(#ab)" />

          <line x1={403} y1={300} x2={173} y2={650} stroke={STROKE} strokeWidth={4} strokeLinecap="round" />
          <line x1={403} y1={300} x2={633} y2={650} stroke={STROKE} strokeWidth={4} strokeLinecap="round" />

          <line x1={153} y1={400} x2={653} y2={400} stroke={STROKE} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
          <line x1={153} y1={480} x2={653} y2={480} stroke={STROKE} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
          <line x1={153} y1={560} x2={653} y2={560} stroke={STROKE} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
          <line x1={395} y1={595} x2={430} y2={560} stroke={BLUE} strokeWidth={3} markerEnd="url(#ab)" />

          <line x1={438} y1={758} x2={403} y2={654} stroke={BLUE} strokeWidth={3} markerEnd="url(#ab)" />

          <line x1={80} y1={650} x2={80} y2={575} stroke={STROKE} strokeWidth={2.5} markerEnd="url(#a)" />
          <line x1={80} y1={650} x2={725} y2={650} stroke={STROKE} strokeWidth={5} markerEnd="url(#at)" />
          <line x1={80} y1={650} x2={45} y2={695} stroke={STROKE} strokeWidth={2.5} markerEnd="url(#a)" />

          <line x1={648} y1={650} x2={648} y2={300} stroke={ORANGE} strokeWidth={6} markerEnd="url(#ao)" />
        </svg>

        <Label x={px(5)} y={py(210)} fontSize={fs(22)}>up</Label>
        <Label x={px(90)} y={py(216)} fontSize={fs(24)}>y</Label>
        <Label x={px(15)} y={py(395)} fontSize={fs(24)}>z</Label>
        <Label x={px(100)} y={py(294)} fontSize={fs(24)}>x</Label>
        <Label x={px(363)} y={py(115)} fontSize={fs(32)} align="middle">Atman</Label>
        <Label x={px(563)} y={py(105)} fontSize={fs(32)} align="middle">Brahman</Label>
        <Label x={px(403)} y={py(615)} fontSize={fs(20)} align="middle">surfaces of realisation</Label>
        <Label x={px(438)} y={py(790)} fontSize={fs(32)} align="middle">Maya</Label>
        <Label x={px(90)} y={py(566)} fontSize={fs(24)}>y</Label>
        <Label x={px(100)} y={py(644)} fontSize={fs(24)}>x</Label>
        <Label x={px(30)} y={py(725)} fontSize={fs(24)}>z</Label>
        <Label x={px(671)} y={py(515)} fontSize={fs(20)} align="middle" color={ORANGE} weight={700} rotate={-90}>
          deep breathing
        </Label>
      </div>
    ),
    { ...size }
  );
}
