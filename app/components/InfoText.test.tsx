import { render, screen } from '@testing-library/react';
import { InfoText } from './InfoText';
import { describe, expect, it } from 'vitest';

describe('InfoText', () => {
  it('exibe o título e o texto quando não está carregando', () => {
    render(<InfoText title="Status" text="Ativo" isLoading={false} />);

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('exibe o título mesmo durante o estado de carregamento', () => {
    render(<InfoText title="Status" text="Ativo" isLoading={true} />);

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.queryByText('Ativo')).not.toBeInTheDocument();
  });
});
