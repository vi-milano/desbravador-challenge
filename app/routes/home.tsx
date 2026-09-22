import type { Route } from './+types/home';

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
  return null;
}
