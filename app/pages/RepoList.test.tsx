import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import RepoList from './RepoList';
import { useGetUserRepos } from '~/hooks/useGetUserRepos';
import { useNavigate, useParams } from 'react-router';

vi.mock('~/hooks/useGetUserRepos', () => ({
  useGetUserRepos: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

describe('RepoList', () => {
  const mockNavigate = vi.fn();
  const mockRepos = [
    {
      id: 1,
      name: 'B-repo',
      stargazers_count: 5,
      updated_at: '2023-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'A-repo',
      stargazers_count: 10,
      updated_at: '2023-05-01T00:00:00Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useParams).mockReturnValue({ username: 'octocat' });
    vi.mocked(useGetUserRepos).mockReturnValue({
      data: { data: mockRepos },
    } as any);
  });

  it('exibe a lista de repositórios ordenada por número de estrelas por padrão', () => {
    render(<RepoList />);

    const listItems = screen.getAllByRole('button');
    expect(listItems[1]).toHaveTextContent('A-repo');
    expect(listItems[2]).toHaveTextContent('B-repo');
  });

  it('ordena a lista por nome ao selecionar a opção correspondente', async () => {
    const user = userEvent.setup();
    render(<RepoList />);

    await user.click(screen.getByRole('button', { name: /mais estrelas/i }));
    await user.click(screen.getByText('Nome (A–Z)'));

    const listItems = screen.getAllByRole('button');
    expect(listItems[1]).toHaveTextContent('A-repo');
    expect(listItems[2]).toHaveTextContent('B-repo');
  });

  it('ordena a lista por data de atualização ao selecionar a opção correspondente', async () => {
    const user = userEvent.setup();
    render(<RepoList />);

    await user.click(screen.getByRole('button', { name: /mais estrelas/i }));
    await user.click(screen.getByText('Atualizados recentemente'));

    const listItems = screen.getAllByRole('button');
    expect(listItems[1]).toHaveTextContent('A-repo');
    expect(listItems[2]).toHaveTextContent('B-repo');
  });

  it('navega para a página de detalhes ao clicar em um repositório', async () => {
    const user = userEvent.setup();
    render(<RepoList />);

    await user.click(screen.getByText('A-repo'));

    expect(mockNavigate).toHaveBeenCalledWith('/user/octocat/A-repo');
  });
});
