import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import RepoDetail from './RepoDetail';
import { useGetRepo } from '~/hooks/useGetRepo';
import { useNavigate, useParams } from 'react-router';

vi.mock('~/hooks/useGetRepo', () => ({
  useGetRepo: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

describe('RepoDetail', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useParams).mockReturnValue({
      username: 'facebook',
      repository: 'react',
    });
    vi.mocked(useGetRepo).mockReturnValue({
      data: undefined,
      isLoading: false,
    } as any);
  });

  it('navega de volta ao clicar no botão "Voltar"', async () => {
    const user = userEvent.setup();
    render(<RepoDetail />);

    await user.click(screen.getByRole('button', { name: /voltar/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('exibe as informações do repositório quando carregado', () => {
    vi.mocked(useGetRepo).mockReturnValue({
      data: {
        data: {
          name: 'react',
          description: 'A JavaScript library for building user interfaces',
          language: 'JavaScript',
          stargazers_count: 200000,
          html_url: 'https://github.com/facebook/react',
        },
      },
      isLoading: false,
    } as any);

    render(<RepoDetail />);

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(
      screen.getByText('A JavaScript library for building user interfaces')
    ).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('200000')).toBeInTheDocument();
  });

  it('desabilita o botão "Acessar no GitHub" durante o carregamento', () => {
    vi.mocked(useGetRepo).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    render(<RepoDetail />);

    expect(
      screen.getByRole('button', { name: /acessar no github/i })
    ).toBeDisabled();
  });

  it('abre a URL do GitHub em uma nova aba ao clicar no botão de acesso', async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    vi.mocked(useGetRepo).mockReturnValue({
      data: {
        data: {
          html_url: 'https://github.com/facebook/react',
        },
      },
      isLoading: false,
    } as any);

    render(<RepoDetail />);

    const githubButton = screen.getByRole('button', {
      name: /acessar no github/i,
    });
    expect(githubButton).toBeEnabled();

    await user.click(githubButton);

    expect(openSpy).toHaveBeenCalledWith(
      'https://github.com/facebook/react',
      '_blank'
    );
  });
});
