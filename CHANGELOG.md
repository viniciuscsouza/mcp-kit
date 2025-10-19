# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.8] - 2025-10-19

### Alterado

- **Refatoração da Base de Conhecimento do `create-mcp-kit`:**
  - Removida a documentação geral do Protocolo MCP e SDK TypeScript do template do `create-mcp-kit`.
  - Adicionada documentação específica do MCP-Kit (`mcp-kit-architecture.md`, `mcp-kit-decorators.md`, `mcp-kit-development-guide.md`, `mcp-kit-lifecycle.md`, `mcp-kit-testing-debugging.md`) ao template.
  - Atualizado `mcp-knowledge-base-index.md` no template para referenciar a nova documentação específica do MCP-Kit e sugerir consulta a recursos online para informações gerais do MCP/SDK.
  - Atualizados `AGENTS.md` e `README.md` no template para refletir as mudanças na documentação e remover referências ao comando `npm start`.
- **Atualização das Regras do Projeto:**
  - Criado `knowledge/mcp-kit-project-rules.md` no monorepo com regras para projetos gerados (independência do monorepo, proibição do comando `npm start` na documentação gerada).
  - Atualizado `AGENTS.md` do monorepo para referenciar `mcp-kit-project-rules.md`.

### Removido

- Pacote `example-server` (`packages/example-server/`) do monorepo, pois sua funcionalidade foi absorvida pelos projetos gerados pelo `create-mcp-kit`.

## [0.0.1] - 2025-10-19

### Adicionado

- Estrutura inicial do monorepo com npm workspaces.
- Pacote `@viniciuscsouza/mcp-kit` com o núcleo do framework:
  - Classe `Application` para orquestração.
  - Decoradores `@Provider`, `@Tool`, `@Prompt`.
  - Lógica para descoberta de capabilities via `reflect-metadata`.
- Pacote `example-server` com um `HelloProvider` de exemplo.
- Configuração de testes com `Vitest` para ambos os pacotes.
- Teste unitário para a classe `Application` do framework.
- Teste unitário para o `HelloProvider` do exemplo.
- Documentação de design inicial em `FRAMEWORK_SPEC.md`.
- Arquivos de memória do projeto em `knowledge/`.