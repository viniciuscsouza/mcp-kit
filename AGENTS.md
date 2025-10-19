# Visão Geral

## Projeto Atual: Ecossistema MCP-Kit

O projeto atual é o desenvolvimento e manutenção do **MCP-Kit**, um ecossistema de ferramentas para construir servidores MCP (Model Context Protocol) em TypeScript.

**Objetivo:** Simplificar e acelerar o desenvolvimento de servidores MCP, oferecendo um framework moderno, ferramentas de scaffolding e exemplos práticos.

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
├── CONTRIBUTING.md
├── GEMINI.md
├── knowledge/
│   ├── ...
├── package.json
├── README.md
└── packages/
    ├── @viniciuscsouza/create-mcp-kit/
    │   ├── package.json
    │   └── src/
    ├── example-server/
    │   ├── package.json
    │   └── src/
    └── @viniciuscsouza/mcp-kit/
        ├── package.json
        └── src/
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
