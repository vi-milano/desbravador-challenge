import type { GitHubUserResponse } from './getGitHubUsers.types';
import { gitHubApi } from './api/gitHubApi';

export const getUser = async (username: string) => {
  return await gitHubApi.get<GitHubUserResponse>(`/users/${username}`);
};
