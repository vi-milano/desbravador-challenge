import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useGetUser } from './useGetUser';
import { getUser } from '~/services/getGitHubUser';
import { createWrapper } from '~/test/helpers';

vi.mock('~/services/getGitHubUser', () => ({
  getUser: vi.fn(),
}));

describe('useGetUser', () => {
  it('não dispara a requisição se username estiver vazio', () => {
    const { result } = renderHook(() => useGetUser(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(getUser).not.toHaveBeenCalled();
  });

  it('busca o usuário com sucesso quando um username é fornecido', async () => {
    const mockUser = { id: 1, login: 'octocat', name: 'The Octocat' };
    vi.mocked(getUser).mockResolvedValueOnce(mockUser as any);

    const { result } = renderHook(() => useGetUser('octocat'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUser);
    expect(getUser).toHaveBeenCalledWith('octocat');
  });

  it('retorna erro em caso de falha no serviço', async () => {
    vi.mocked(getUser).mockRejectedValueOnce(new Error('User not found'));

    const { result } = renderHook(() => useGetUser('octocat'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error('User not found'));
  });
});
