# Memória do Projeto: Concepção e Estrutura do MCP-Kit

Este documento resume o processo de design e a implementação inicial do framework `MCP-Kit`.

## 1. Objetivo

O objetivo foi criar um framework para TypeScript que simplifica e acelera o desenvolvimento de servidores MCP (Model Context Protocol), com foco em uma excelente experiência para o desenvolvedor (DX).

## 2. Decisões de Design e Arquitetura

- **Nome do Framework**: `MCP-Kit`.
- **Abstração Principal**: O conceito de `Provider` (`@Provider`) foi criado como uma classe que agrupa capabilities (`Tools`, `Prompts`, `Resources`) de um mesmo domínio.
- **API Declarativa**: A interação com o framework é feita através de decoradores (`@Provider`, `@Tool`, `@Prompt`).
- **Inversão de Controle (IoC)**: Uma classe central `Application` é responsável por instanciar e gerenciar os `Providers`, que são passivos e não conhecem a aplicação.
- **Convenção sobre Configuração**: Adotamos convenções mandatórias para simplificar o uso:
  - **Nomenclatura de Arquivos**: Providers devem seguir o padrão `*.provider.ts`.
  - **Namespacing Automático**: A propriedade `name` do decorador `@Provider` é usada como um prefixo automático para os IDs de `Tools` e `Prompts` (ex: `hello.say`), evitando conflitos.
- **Estrutura de Monorepo**: O projeto foi organizado em um monorepo com `npm workspaces`, separando o código do framework (`packages/mcp-kit`) do servidor de exemplo (`packages/example-server`).
- **Testes**: A estrutura de testes foi incluída desde o início usando `Vitest`.
  - O teste do framework (`application.test.ts`) valida a lógica de descoberta de capabilities usando mocks (`vi.doMock`).
  - O teste do servidor de exemplo (`hello.provider.test.ts`) valida a lógica de um provider específico.

## 3. Artefatos Criados

- **Especificação**: `FRAMEWORK_SPEC.md` foi criado e iterativamente refinado para documentar os requisitos.
- **Memória Inicial**: `knowledge/mcp-kit-design-memory.md` foi criado para registrar as decisões de design.
- **Código Fonte**: A estrutura inicial do monorepo foi criada, incluindo:
  - O núcleo do `MCP-Kit` em `packages/mcp-kit/src/` (com `Application` e os decoradores).
  - Um servidor de exemplo em `packages/example-server/src/`.
  - Testes unitários para ambos os pacotes.
  - Arquivos de configuração (`package.json`, `tsconfig.json`, `.gitignore`).

## 4. Desafios e Soluções

- **Depuração de Testes**: Enfrentamos múltiplos erros relacionados ao "hoisting" de `vi.mock` no Vitest. A solução final foi adotar `vi.doMock` com importações dinâmicas para garantir a ordem correta de inicialização dos mocks.
- **Configuração do Build**: O processo de compilação do TypeScript (`tsc`) falhou inicialmente devido a caminhos de importação incorretos do SDK e tipos de schema (`ZodSchema`). Isso foi corrigido ajustando os `imports` e a lógica de registro de tools na classe `Application`.
- **Comunicação via `stdio`**: Foi identificado e corrigido um erro crítico onde `console.log()` era usado para logs, o que corromperia o transporte `stdio`. A correção foi usar `console.error()`, que escreve para `stderr`.

## 5. Estrutura Final de Arquivos

```
.
├── AGENTS.md
├── FRAMEWORK_SPEC.md
├── knowledge
│   ├── llms-full.txt
│   ├── mcp-kit-design-memory.md
│   └── modelcontextprotocol
├── node_modules
├── package-lock.json
├── package.json
└── packages
    ├── example-server
    │   ├── package.json
    │   ├── src
    │   │   ├── main.ts
    │   │   └── providers
    │   │       ├── hello.provider.ts
    │   │       └── index.ts
    │   ├── tests
    │   │   └── hello.provider.test.ts
    │   └── tsconfig.json
    └── mcp-kit
        ├── dist
        ├── package.json
        ├── src
        │   ├── application.ts
        │   ├── decorators
        │   │   ├── index.ts
        │   │   ├── prompt.decorator.ts
        │   │   ├── provider.decorator.ts
        │   │   └── tool.decorator.ts
        │   └── index.ts
        ├── tests
        │   └── application.test.ts
        └── tsconfig.json
```
