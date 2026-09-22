import type { GitHubUserReposResponse } from './getGitHubUserRepos.types';
import { gitHubApi } from './api/gitHubApi';

export const getGitHubUserRepos = async (username: string) => {
  return await gitHubApi.get<GitHubUserReposResponse>(
    `/users/${username}/repos`,
    { params: { sort: 'stars', direction: 'desc', per_page: 7 } }
  );
};
