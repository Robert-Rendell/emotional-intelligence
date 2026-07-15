import { notFound } from "next/navigation";
import EIDiagram from "../EIDiagram";
import { TOPICS } from "../topics";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic: topic.id }));
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
