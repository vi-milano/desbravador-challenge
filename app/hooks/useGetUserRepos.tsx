import { useQuery } from '@tanstack/react-query';
import { getGitHubUserRepos } from '~/services/getGitHubUserRepos';

export function useGetUserRepos(username: string) {
  return useQuery({
    queryKey: ['users', 'repos', username],
    queryFn: () => getGitHubUserRepos(username),
  });
}
