import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useGetUser } from '~/hooks/useGetUser';
import { useNavigate, useMatch, useLocation, useOutlet } from 'react-router';
import Search from '.';

vi.mock('~/hooks/useGetUser', () => ({
  useGetUser: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useMatch: vi.fn(),
  useLocation: vi.fn(),
  useOutlet: vi.fn(),
}));

describe('Search', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useMatch).mockReturnValue(null);
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' } as any);
    vi.mocked(useOutlet).mockReturnValue(null);
    vi.mocked(useGetUser).mockReturnValue({
      data: undefined,
      isSuccess: false,
      isLoading: false,
      isError: false,
    } as any);
  });

  it('redireciona para "/"  no caso do input vazio', async () => {
    const user = userEvent.setup();
    render(<Search />);

    await user.click(screen.getByRole('button', { name: /buscar/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('redireciona para "user/nome-usuario" ao digitar nome de usuário e clicar em buscar', async () => {
    const user = userEvent.setup();
    render(<Search />);

    const input = screen.getByRole('textbox', {
      name: /buscar usuário do github/i,
    });
    await user.type(input, 'octocat');
    await user.click(screen.getByRole('button', { name: /buscar/i }));

    expect(mockNavigate).toHaveBeenCalledWith('user/octocat');
  });

  it('exibe mensagem de erro quando o usuário não é encontrado', () => {
    vi.mocked(useGetUser).mockReturnValue({
      data: undefined,
      isSuccess: false,
      isLoading: false,
      isError: true,
    } as any);

    render(<Search />);

    expect(screen.getByText('Usuário não encontrado.')).toBeInTheDocument();
  });

  it('exibe os dados do usuário quando o usuario é encontrado', () => {
    vi.mocked(useGetUser).mockReturnValue({
      data: {
        data: {
          avatar_url: 'https://avatar.url',
          name: 'The Octocat',
          email: 'octocat@github.com',
          bio: 'Github Mascot',
          followers: 100,
          following: 50,
        },
      },
      isSuccess: true,
      isLoading: false,
      isError: false,
    } as any);

    render(<Search />);

    expect(screen.getByText('The Octocat')).toBeInTheDocument();
    expect(screen.getByText('octocat@github.com')).toBeInTheDocument();
    expect(screen.getByText('Github Mascot')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://avatar.url'
    );
  });
});
