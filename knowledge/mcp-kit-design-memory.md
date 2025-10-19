# Memória: Design do Framework MCP-Kit

Este arquivo resume as decisões de design para o framework **MCP-Kit**.

- **Nome:** MCP-Kit
- **Objetivo:** Simplificar e acelerar o desenvolvimento de servidores MCP em TypeScript.
- **Arquitetura:** Baseada em decoradores (`@Provider`, `@Tool`, `@Prompt`) e Inversão de Controle (uma classe `Application` central que gerencia múltiplos `Providers`).
- **Convenções Mandatórias:** Arquivos de provider devem seguir a nomenclatura `*.provider.ts`. O `name` do `@Provider` funciona como um namespace automático para os IDs das capabilities.
- **Scaffolding:** Um comando `npx @viniciuscsouza/create-mcp-kit` irá gerar um projeto inicial, já configurado com Vitest para testes.
- **Documento de Especificação:** O plano detalhado está em `FRAMEWORK_SPEC.md`.
