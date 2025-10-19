# MCP-Kit Monorepo

Este repositório contém o código-fonte do **MCP-Kit**, um framework para construir servidores MCP (Model Context Protocol) em TypeScript, e um servidor de exemplo que demonstra seu uso.

## Estrutura

Este é um monorepo gerenciado com [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). Os pacotes individuais estão localizados na pasta `packages/`.

- `packages/mcp-kit`: O código-fonte do framework `MCP-Kit`.
- `packages/example-server`: Um servidor de exemplo que utiliza o `mcp-kit`.

## Documentação de Design

Todo o processo de design e as especificações do framework estão documentados em [FRAMEWORK_SPEC.md](./FRAMEWORK_SPEC.md).

## Começando

**Pré-requisitos:**
- Node.js (v18+)
- npm (v7+)

1. **Instalar Dependências**
   Na raiz do projeto, rode o comando para instalar as dependências de todos os pacotes e criar os links entre os workspaces.
   ```bash
   npm install
   ```

2. **Compilar o Framework**
   Antes de rodar os exemplos ou testes, você precisa compilar o `mcp-kit`.
   ```bash
   npm run build --workspace=mcp-kit
   ```

3. **Executar os Testes**
   Para rodar os testes de todos os pacotes (framework e exemplo):
   ```bash
   npm test --workspaces
   ```

4. **Iniciar o Servidor de Exemplo**
   ```bash
   npm start --workspace=example-server
   ```
