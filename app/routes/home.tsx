import type { Route } from './+types/home';
import Search from '~/search';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'GitHub Username Search' },
    {
      name: 'description',
      content: 'This is the route responsible for the username search',
    },
  ];
}

export default function Home() {
  return <Search />;
}
