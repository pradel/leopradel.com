export interface Project {
  title: string;
  description: string;
  githubUrl: string;
  twitterUrl?: string;
  websiteUrl: string;
  githubStarsCount?: number;
}

export async function getProjects(): Promise<Project[]> {
  let projects: Project[] = [
    {
      title: 'Sigle',
      description: 'A beautiful decentralized and open source blog maker.',
      githubUrl: 'https://github.com/sigle/sigle',
      twitterUrl: 'https://twitter.com/sigleapp',
      websiteUrl: 'https://www.sigle.io',
    },
    {
      title: 'accounts-js',
      description:
        'Fullstack authentication and accounts-management for Javascript.',
      githubUrl: 'https://github.com/accounts-js/accounts',
      websiteUrl: 'https://www.accountsjs.com',
    },
    {
      title: 'Ledokku',
      description: 'Beautiful web UI for all things Dokku.',
      githubUrl: 'https://github.com/ledokku/ledokku',
      websiteUrl: 'https://github.com/ledokku/ledokku',
    },
    {
      title: 'react-responsive-modal',
      description: 'Simple responsive react modal.',
      githubUrl: 'https://github.com/pradel/react-responsive-modal',
      websiteUrl: 'https://react-responsive-modal.leopradel.com/',
    },
  ];

  projects = await Promise.all(
    projects.map(async (project) => {
      const githubOrg = project.githubUrl.split('/')[3];
      const githubRepo = project.githubUrl.split('/')[4];
      const data = await fetch(
        `https://api.github.com/repos/${githubOrg}/${githubRepo}`,
      );
      const json = await data.json();
      project.githubStarsCount = json.stargazers_count;
      return project;
    }),
  );

  return projects;
}
