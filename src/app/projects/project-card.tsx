import { StarFilledIcon } from '@radix-ui/react-icons';
import { Project } from './get-projects';

interface ProjectProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <div className="flex lg:w-1/2">
      <div className="m-2 flex w-full flex-col justify-between rounded-lg border border-gray-400 bg-white p-4 leading-normal shadow-sm transition-shadow duration-300 ease-linear hover:shadow-md">
        <div className="space-y-1">
          <h3>
            <a
              className="text-lg font-semibold hover:underline"
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
          </h3>
          <p className="text-sm text-gray-600">{project.description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="-mx-1 flex items-center">
            {project.twitterUrl && (
              <a
                className="p-1"
                href={project.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-4 w-4 fill-current text-gray-600 transition-colors duration-150 ease-in-out hover:text-watermelon"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z"
                    fillRule="nonzero"
                  />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                className="p-1"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-4 w-4 fill-current text-gray-600 transition-colors duration-150 ease-in-out hover:text-watermelon"
                  viewBox="0 0 24 24"
                >
                  <title>GitHub icon</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            )}
          </p>
          <p className="flex items-center space-x-0.5 text-gray-600">
            <StarFilledIcon />
            <span>{project.githubStarsCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
