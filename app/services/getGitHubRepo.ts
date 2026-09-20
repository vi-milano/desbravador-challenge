import { gitHubApi } from './api/gitHubApi';
import type {
  GitHubRepoProps,
  GitHubRepoResponse,
} from './getGitHubRepo.types';

export const getGitHubRepo = async ({ owner, repository }: GitHubRepoProps) => {
  return await gitHubApi.get<GitHubRepoResponse>(
    `/repos/${owner}/${repository}`
  );
};
