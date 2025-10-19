# Regras para Projetos Gerados pelo MCP-Kit

Este documento descreve as regras e diretrizes que devem ser seguidas ao interagir com projetos de servidor MCP gerados pela ferramenta `@viniciuscsouza/create-mcp-kit`.

## 1. Independência do Monorepo

Servidores MCP criados com `create-mcp-kit` **NÃO DEVEM** referenciar arquivos ou diretórios do monorepo principal. Cada projeto gerado deve ser autossuficiente e independente. Isso garante que o projeto possa ser desenvolvido, testado e implantado isoladamente, sem dependências externas do ambiente de desenvolvimento original.

## 2. Comando `npm start`

A documentação de servidores MCP gerados por `create-mcp-kit` **NÃO DEVE** incluir o comando `npm start`. Este comando não existe por padrão em projetos gerados e não deve ser introduzido. O foco é na execução direta do servidor MCP, tipicamente via scripts como `npm run inspect` (para depuração com o MCP Inspector) ou `npm run build && node dist/main.js` (para execução em produção ou teste).

## 3. Documentação Interna

A documentação interna (`knowledge/`) de um projeto gerado pelo `create-mcp-kit` deve ser a fonte primária de informação para a IA sobre a arquitetura e o desenvolvimento do servidor MCP-Kit. Para informações gerais sobre o Protocolo MCP e a SDK TypeScript, a IA deve ser instruída a consultar a documentação oficial online (e.g., `modelcontextprotocol.io`).
