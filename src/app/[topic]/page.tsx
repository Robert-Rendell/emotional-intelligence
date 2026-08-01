import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EIDiagram from "../EIDiagram";
import { TOPICS } from "../topics";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic: topic.id }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const match = TOPICS.find((t) => t.id === topic);

  if (!match) {
    return {};
  }

  const title = `${match.label} — Emotional Intelligence`;

  return {
    title,
    description: match.description,
    openGraph: {
      title,
      description: match.description,
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  if (!TOPICS.some((t) => t.id === topic)) {
    notFound();
  }

  return (
    <main className="main">
      <h1 className="srOnly">Emotional Intelligence</h1>
      <EIDiagram initialTopicId={topic} />
    </main>
  );
}
