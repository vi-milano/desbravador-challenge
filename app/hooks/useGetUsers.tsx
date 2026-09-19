import { useMutation } from '@tanstack/react-query';
import { getUser } from '~/services/getGitHubUsers';

export function useGetUsers() {
  return useMutation({
    mutationKey: ['users', 'search'],
    mutationFn: getUser,
  });
}
