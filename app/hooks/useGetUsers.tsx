import { useQuery } from '@tanstack/react-query';
import { getUser } from '~/services/getGitHubUsers';

export function useGetUsers(username: string) {
  return useQuery({
    queryKey: ['repos', username],
    queryFn: () => getUser(username),
    enabled: Boolean(username),
  });
}
