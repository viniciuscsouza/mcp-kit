# Visão Geral

## Projeto Atual: MCP-Kit

O projeto atual é a concepção e planejamento de um novo framework chamado **MCP-Kit**, construído sobre o SDK de TypeScript do MCP.

**Objetivo:** Simplificar e acelerar o desenvolvimento de servidores MCP em TypeScript, utilizando uma abordagem moderna e declarativa.

O plano detalhado e a especificação completa deste framework estão documentados no arquivo `FRAMEWORK_SPEC.md`.

## Stack Tecnológica

- **Linguagem:** TypeScript
- **Ambiente:** Node.js
- **Gerenciador de Pacotes:** npm com Workspaces (Monorepo)
- **Framework de Testes:** Vitest
- **Executor de TS:** tsx
- **Dependências Principais:** `@modelcontextprotocol/sdk`, `reflect-metadata`

## Estrutura de Arquivos e Pastas

```
.
├── .gitignore
├── AGENTS.md
├── CHANGELOG.md
├── FRAMEWORK_SPEC.md
├── GEMINI.md
├── knowledge/
│   ├── llms-full.txt
│   ├── mcp-kit-design-memory.md
│   ├── mcp-knowledge-base-index.md
│   ├── mcp-protocol-reference.md
│   ├── modelcontextprotocol/
│   │   ├── ANTITRUST.md
│   │   ├── CODE_OF_CONDUCT.md
│   │   ├── CONTRIBUTING.md
│   │   ├── MAINTAINERS.md
│   │   ├── README.md
│   │   ├── SECURITY.md
│   │   ├── blog/
│   │   └── docs/
│   ├── project-retrospective-memory.md
│   └── typescript-sdk/
│       ├── CLAUDE.md
│       ├── CODE_OF_CONDUCT.md
│       ├── CONTRIBUTING.md
│       ├── README.md
│       ├── SECURITY.md
│       └── src/
├── package.json
├── README.md
└── packages/
    ├── example-server/
    │   ├── package.json
    │   ├── src/
    │   ├── tests/
    │   └── tsconfig.json
    └── mcp-kit/
        ├── package.json
        ├── src/
        ├── tests/
        └── tsconfig.json
```

## Instruções

**Sempre** consulte o arquivo `knowledge/mcp-knowledge-base-index.md` antes de realizar qualquer tarefa para ter um ponto de partida centralizado.
Caso o `knowledge/mcp-knowledge-base-index.md` não seja suficiente, consulte o `knowledge/mcp-protocol-reference.md` para obter detalhes mais aprofundados.
**Sempre** que aprender algo novo crie um arquivo `*-memory.md` na pasta `knowledge`.
**Guarde** informações importante do projeto em arquivos `*-context.md` na pasta `knowledge`.
**Crie** arquivos de especificação `*-spec.md` na pasta `knowledge`.

## Referências
**Sempre** utilize o índice da base de conhecimento como ponto de partida para encontrar informações sobre o projeto e o protocolo MCP:

- [knowledge/mcp-knowledge-base-index.md](knowledge/mcp-knowledge-base-index.md): Índice central para toda a documentação relevante do projeto, protocolo e SDKs.
- [knowledge/mcp-protocol-reference.md](knowledge/mcp-protocol-reference.md): Documento de referência detalhado sobre o protocolo MCP e o SDK TypeScript.

**Sempre** Utilize o servidor MCP `microsoft-learn/docs` quando estiver implementando recursos para o agente Github Copilot.