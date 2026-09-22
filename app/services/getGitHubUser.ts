import type { GitHubUserResponse } from './getGitHubUser.types';
import { gitHubApi } from './api/gitHubApi';

export const getUser = async (username: string) => {
  return await gitHubApi.get<GitHubUserResponse>(`/users/${username}`);
};
