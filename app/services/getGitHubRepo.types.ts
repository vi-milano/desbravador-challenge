import type { Endpoints } from '@octokit/types';

export type GitHubRepoProps = { owner: string; repository: string };
export type GitHubRepoResponse =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];
