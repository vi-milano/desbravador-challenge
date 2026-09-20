import type { Endpoints } from '@octokit/types';

export type GitHubUserReposResponse =
  Endpoints['GET /users/{username}/repos']['response']['data'];
