# Desafio Desbravador Challenge

## Introdução

Este documento tem como objetivo explicar e, quando necessário, justificar as principais decisões técnicas tomadas durante a construção do projeto.

As alterações foram organizadas utilizando o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification), facilitando o entendimento da evolução do projeto ao longo do desenvolvimento.

## Sobre o setup

Foi utilizado o **Vite** como ferramenta de build e desenvolvimento por oferecer uma configuração simples e uma performance alta.

A escolha também permite manter o setup relativamente enxuto, sem adicionar complexidade desnecessária ao projeto.

## Sobre as bibliotecas incluídas

- O desafio solicita responsividade utilizando **Bootstrap**. Por isso, optei por utilizar o próprio **Bootstrap**, juntamente com **React Bootstrap**, como base da interface. Além de atender ao requisito de responsividade, isso fornece componentes já padronizados e reduz a necessidade de implementar comportamentos comuns manualmente.

- Foi incluído o **Axios** para centralizar e padronizar a comunicação HTTP com a API do GitHub. Ele é utilizado em conjunto com o **TanStack Query**, que fica responsável pelo gerenciamento do estado assíncrono das requisições, incluindo cache, refetch, loading e error states.

- O **React Router** foi utilizado para estruturar a navegação da aplicação e permitir que usuário, lista de repositórios e detalhes de um repositório sejam representados por URLs distintas.

- O **ESLint** foi incluído para auxiliar na identificação de problemas e manter padrões de qualidade no código. O **Prettier** é utilizado para padronizar a formatação.

- O **Vitest** e o **Testing Library** foram utilizados para a implementação dos testes automatizados, priorizando o comportamento dos componentes e hooks em vez de detalhes internos de implementação.

## Sobre a estrutura de pastas

Busquei evitar uma estrutura de pastas excessivamente complexa, considerando o escopo relativamente pequeno da aplicação.

As pastas foram organizadas principalmente por responsabilidade, separando componentes, páginas, hooks, serviços e rotas.

Para um projeto com uma quantidade maior de funcionalidades e domínios, uma estrutura orientada a módulos/features poderia ser mais adequada. Neste caso, entretanto, acredito que essa abordagem adicionaria complexidade sem um benefício proporcional.

## Sobre a arquitetura

A aplicação foi construída como uma **SPA (Single Page Application)** e executa as consultas à API do GitHub diretamente no client-side.

O **TanStack Query** concentra o gerenciamento do estado assíncrono, enquanto a camada de serviços é responsável pela comunicação com a API.

De forma simplificada:

```text
UI
 ↓
React Query
 ↓
Service / Axios
 ↓
GitHub API
```

Essa separação permite manter a lógica de comunicação com a API independente dos componentes de apresentação.

## Como executar

### Requisitos

- Node.js 20+
- npm 10+

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

### Desenvolvimento

Execute:

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente, normalmente em:

```text
http://localhost:5173
```

### Testes

Para executar os testes:

```bash
npm test
```

### Typecheck

Para verificar os tipos TypeScript:

```bash
npm run typecheck
```

### Lint

Para executar o ESLint:

```bash
npm run lint
```

### Build

Para gerar a versão de produção:

```bash
npm run build
```

## Considerações

O objetivo deste projeto foi buscar um equilíbrio entre utilizar ferramentas modernas e evitar complexidade desnecessária para o tamanho da aplicação.

As decisões de arquitetura e bibliotecas foram tomadas considerando principalmente:

- simplicidade;
- manutenibilidade;
- separação de responsabilidades;
- experiência de desenvolvimento;
- facilidade de evolução;

Existe ainda a possibilidade de iterar muito mais no projeto, principalmente nos fluxos de cenários de erro e empty states, e em um cenário real algumas decisões seriam questionadas para melhor entendimento de produto como a quantidade de repositórios padrão, paginação etc.
