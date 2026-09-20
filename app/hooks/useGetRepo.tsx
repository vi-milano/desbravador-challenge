import { useQuery } from '@tanstack/react-query';
import { getGitHubRepo } from '~/services/getGitHubRepo';
import type { GitHubRepoProps } from '~/services/getGitHubRepo.types';

export function useGetRepo({ owner, repository }: GitHubRepoProps) {
  return useQuery({
    queryKey: ['repos', owner, repository],
    queryFn: () => getGitHubRepo({ owner, repository }),
  });
}
