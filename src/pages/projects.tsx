import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface ProjectProps {
  project: {
    title: string;
    description: string;
    websiteUrl: string;
    githubUrl?: string;
    twitterUrl?: string;
  };
}

const Project = ({ project }: ProjectProps) => {
  return (
    <div className="lg:w-1/2 flex">
      <div className="border border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal m-2 w-full hover:shadow-md transition-shadow duration-300 ease-linear">
        <div>
          <h3 className="mb-2">
            <a
              className="text-gray-900 hover:text-watermelon font-bold text-xl transition-colors duration-150 ease-in-out"
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
          </h3>
          <p className="text-gray-700 text-base">{project.description}</p>
        </div>
        <p className="-mx-1 mt-1 flex items-center">
          {project.twitterUrl && (
            <a
              className="p-1"
              href={project.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-4 h-4 text-gray-600 hover:text-watermelon fill-current transition-colors duration-150 ease-in-out"
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
                className="w-4 h-4 text-gray-600 hover:text-watermelon fill-current transition-colors duration-150 ease-in-out"
                viewBox="0 0 24 24"
              >
                <title>GitHub icon</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

const Projects = () => (
  <React.Fragment>
    <Header />

    <main className="mx-auto max-w-3xl px-6 xl:px-12 mt-20 mb-12">
      <h4 className="leading-tight text-4xl font-bold mt-20 mb-4">Projects</h4>
      <section className="lg:flex lg:flex-wrap -mx-2">
        <Project
          project={{
            title: 'accounts-js',
            description:
              'Fullstack authentication and accounts-management for Javascript.',
            githubUrl: 'https://github.com/accounts-js/accounts',
            websiteUrl: 'https://www.accountsjs.com',
          }}
        />
        <Project
          project={{
            title: 'Sigle',
            description:
              'A beautiful decentralized and open source blog maker.',
            githubUrl: 'https://github.com/pradel/sigle',
            twitterUrl: 'https://twitter.com/sigleapp',
            websiteUrl: 'https://www.sigle.io',
          }}
        />
        <Project
          project={{
            title: 'Twoblocks',
            description:
              'Free and open source 2fa manager built with Blockstack.',
            githubUrl: 'https://github.com/pradel/twoblocks',
            websiteUrl: 'https://twoblocks.leopradel.com/',
          }}
        />
        <Project
          project={{
            title: 'octon',
            description:
              'Notifies you when there is a new release on repos you starred on Github.',
            githubUrl: 'https://github.com/pradel/octon',
            websiteUrl: 'https://github.com/pradel/octon',
          }}
        />
        <Project
          project={{
            title: 'react-responsive-modal',
            description: 'Simple responsive react modal.',
            githubUrl: 'https://github.com/pradel/react-responsive-modal',
            websiteUrl: 'https://react-responsive-modal.leopradel.com/',
          }}
        />
        <Project
          project={{
            title: 'gitlab-ci-validate',
            description: 'Checks if your .gitlab-ci.yml file is valid.',
            githubUrl: 'https://github.com/pradel/gitlab-ci-validate',
            websiteUrl: 'https://github.com/pradel/gitlab-ci-validate',
          }}
        />
        <Project
          project={{
            title: 'craco-blockstack',
            description:
              'A craco plugin to use Blockstack with create-react-app.',
            githubUrl: 'https://github.com/pradel/craco-blockstack',
            websiteUrl: 'https://github.com/pradel/craco-blockstack',
          }}
        />
        <Project
          project={{
            title: 'react-google-photo',
            description:
              'React lightbox component using the google photo style.',
            githubUrl: 'https://github.com/pradel/react-google-photo',
            websiteUrl: 'https://react-google-photo.leopradel.com/',
          }}
        />
      </section>
    </main>

    <Footer />
  </React.Fragment>
);

export default Projects;
