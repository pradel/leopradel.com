import { getProjects } from './get-projects';
import { ProjectCard } from './project-card';

export const runtime = 'edge';
// Revalidate this page every 1 hour
export const revalidate = 60 * 60;

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <h4 className="font-sans leading-tight text-4xl font-bold mt-20 mb-4">
        Projects
      </h4>
      <section className="lg:flex lg:flex-wrap -mx-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </>
  );
}
