import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';

import { useGetUserRepos } from './useGetUserRepos';
import { getGitHubUserRepos } from '~/services/getGitHubUserRepos';

vi.mock('~/services/getGitHubUserRepos', () => ({
  getGitHubUserRepos: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useGetUserRepos', () => {
  it('retorna a lista de repositórios do usuário com sucesso', async () => {
    const mockRepos = [
      { id: 1, name: 'repo-1' },
      { id: 2, name: 'repo-2' },
    ];
    vi.mocked(getGitHubUserRepos).mockResolvedValueOnce(mockRepos as any);

    const { result } = renderHook(() => useGetUserRepos('octocat'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockRepos);
    expect(getGitHubUserRepos).toHaveBeenCalledWith('octocat');
  });

  it('retorna erro em caso de falha no serviço', async () => {
    vi.mocked(getGitHubUserRepos).mockRejectedValueOnce(
      new Error('Erro ao buscar repositórios')
    );

    const { result } = renderHook(() => useGetUserRepos('octocat'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(
      new Error('Erro ao buscar repositórios')
    );
  });
});
