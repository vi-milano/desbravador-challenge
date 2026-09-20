import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/', 'layouts/search/index.tsx', [
    index('routes/home.tsx'),
    route('user/:username', './routes/userRepos.tsx'),
    route('user/:username/:repository', './routes/repo.tsx'),
  ]),
] satisfies RouteConfig;
