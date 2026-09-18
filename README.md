# Desafio Desbravador Challenge

## Introdução

Esse documento servirá para justificar e explicar quando necessário as decisões técnicas tomadas por mim na construção desse projeto. As alterações estarão devidamente comitadas usando o padrão do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) para melhor entendimento da evolução do projeto.

## Sobre o setup

Escolhi o Vite sobre outros bundlers justamente por atualmente ser o padrão da industria. Ele trata de questões de performance e tamanho muito melhor do que era tratado com outras ferramentas.

## Sobre bibliotecas incluídas

- O desafio pede responsividade padrão **Bootstrap**, então preferi usar o próprio **Bootstrap** como a biblioteca de componentes do projeto resolvendo dois problemas: a padronização visual e a responsividade.
- Também foi incluida a lib do **Axios** pela mesma razão, porém ao invés de usa-lo sozinho será feito em conjunto com o **TanStack Query** pelas otimizações como caches, refetch e organização de estado.
- Incluso ESLint para garantir um padrão de qualidade de código em união com o prettier para padronizar estilo de formatação.

## Sobre estrutura de pastas

Irei evitar estruturas de pastas excessivamente complexas justamente pelo projeto ser simples. Se o projeto tivesse muitas funcionalidades eu seguiria por uma estrutura por módulos ou features.
