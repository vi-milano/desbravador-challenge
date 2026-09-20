import RepoDetail from '~/pages/RepoDetail';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'GitHub Repo' },
    {
      name: 'description',
      content: 'This is the route responsible for the repository information',
    },
  ];
}

export default function UserRepos() {
  return <RepoDetail />;
}
