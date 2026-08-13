import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — Aryan Dhillon`,
    description: project.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const previousProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <ProjectDetail
      project={project}
      previous={{ id: previousProject.id, name: previousProject.name }}
      next={{ id: nextProject.id, name: nextProject.name }}
    />
  );
}
