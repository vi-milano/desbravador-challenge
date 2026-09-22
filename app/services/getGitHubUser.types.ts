import type { Endpoints } from '@octokit/types';

export type GitHubUserResponse =
  Endpoints['GET /users/{username}']['response']['data'];
