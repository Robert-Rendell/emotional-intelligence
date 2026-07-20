import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emotional Intelligence",
  description: "Emotional intelligence is the foundation for all schools of thought and learning... and possibly IQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
