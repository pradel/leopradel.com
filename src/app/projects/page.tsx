import { Metadata } from 'next';
import { PageWrapper } from '../page-wrapper';
import { getProjects } from './get-projects';
import { ProjectCard } from './project-card';

export const runtime = 'edge';
// Revalidate this page every 1 hour
export const revalidate = 60 * 60;

export const metadata: Metadata = {
  alternates: {
    canonical: `/projects`,
  },
};

export default async function Page() {
  const projects = await getProjects();

  return (
    <PageWrapper>
      <h4 className="mb-4 mt-20 font-sans text-4xl font-bold leading-tight">
        Projects
      </h4>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </PageWrapper>
  );
}
