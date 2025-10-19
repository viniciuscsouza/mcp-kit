# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-10-19

### Adicionado

- Estrutura inicial do monorepo com npm workspaces.
- Pacote `mcp-kit` com o núcleo do framework:
  - Classe `Application` para orquestração.
  - Decoradores `@Provider`, `@Tool`, `@Prompt`.
  - Lógica para descoberta de capabilities via `reflect-metadata`.
- Pacote `example-server` com um `HelloProvider` de exemplo.
- Configuração de testes com `Vitest` para ambos os pacotes.
- Teste unitário para a classe `Application` do framework.
- Teste unitário para o `HelloProvider` do exemplo.
- Documentação de design inicial em `FRAMEWORK_SPEC.md`.
- Arquivos de memória do projeto em `knowledge/`.
