import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextSkeleton } from './TextSkeleton';

describe('TextSkeleton', () => {
  it('exibe loading quando isLoading é true', () => {
    render(<TextSkeleton isLoading={true} text="Conteúdo" />);

    expect(
      screen.getByRole('status', { name: /carregando/i })
    ).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo')).not.toBeInTheDocument();
  });

  it('exibe o texto quando isLoading é false', () => {
    render(<TextSkeleton isLoading={false} text="Conteúdo" />);

    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('exibe filhos quando isLoading é false', () => {
    render(
      <TextSkeleton isLoading={false}>
        <span>Texto Filho</span>
      </TextSkeleton>
    );

    expect(screen.getByText('Texto Filho')).toBeInTheDocument();
  });
});
