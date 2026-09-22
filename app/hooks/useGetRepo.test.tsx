import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { useGetRepo } from './useGetRepo';
import { getGitHubRepo } from '~/services/getGitHubRepo';

vi.mock('~/services/getGitHubRepo', () => ({
  getGitHubRepo: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useGetRepo', () => {
  it('retorna os dados do repositório com sucesso', async () => {
    const mockData = { id: 1, name: 'react', owner: 'facebook' };
    vi.mocked(getGitHubRepo).mockResolvedValueOnce(mockData as any);

    const { result } = renderHook(
      () => useGetRepo({ owner: 'facebook', repository: 'react' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(getGitHubRepo).toHaveBeenCalledWith({
      owner: 'facebook',
      repository: 'react',
    });
  });

  it('retorna erro quando a requisição falha', async () => {
    vi.mocked(getGitHubRepo).mockRejectedValueOnce(new Error('Erro na API'));

    const { result } = renderHook(
      () => useGetRepo({ owner: 'facebook', repository: 'react' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error('Erro na API'));
  });
});
