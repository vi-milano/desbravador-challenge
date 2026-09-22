import { useQuery } from '@tanstack/react-query';
import { getUser } from '~/services/getGitHubUsers';

const STALE_TIME = 5 * 60 * 1000;
export function useGetUser(username: string) {
  return useQuery({
    queryKey: ['gitHubUser', username],
    queryFn: () => getUser(username),
    enabled: !!username,
    staleTime: STALE_TIME,
    retry: false,
  });
}
