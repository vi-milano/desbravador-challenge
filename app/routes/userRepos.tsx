import type { Route } from './+types/home';
import RepoList from '~/pages/RepoList';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'GitHub User Repos' },
    {
      name: 'description',
      content: 'This is the route responsible for the user repo list',
    },
  ];
}

export default function UserRepos() {
  return <RepoList />;
}
