# MCP-Kit Monorepo

Este repositório contém o código-fonte do **MCP-Kit**, um ecossistema de ferramentas para construir servidores MCP (Model Context Protocol) em TypeScript de forma moderna e eficiente.

## O Ecossistema

O MCP-Kit é composto por três pacotes principais que vivem neste monorepo:

- **`packages/mcp-kit`**: O coração do projeto. É um framework baseado em decoradores (`@Provider`, `@Tool`) que simplifica a criação de toda a lógica de um servidor MCP.
- **`packages/create-mcp-kit`**: Uma ferramenta de linha de comando (CLI) para gerar rapidamente um novo projeto de servidor, já configurado com o MCP-Kit.
- **`packages/example-server`**: Um servidor de exemplo que demonstra as funcionalidades do framework e serve como um guia prático.

## Recursos Principais

- **Arquitetura com Decoradores**: Use `@Provider`, `@Tool`, e `@Prompt` para organizar seu código de forma declarativa e intuitiva.
- **Validação de Schema Integrada**: Defina os schemas de entrada para suas ferramentas e prompts usando **Zod**.
- **Registro Automático**: O framework registra automaticamente suas ferramentas, prompts e recursos no servidor MCP.
- **Ecossistema Completo**: Ferramentas de scaffolding (`create-mcp-kit`) para iniciar projetos rapidamente.

## Status do Projeto

**Em desenvolvimento ativo.** O MCP-Kit é um projeto novo e está em constante evolução. A API pode sofrer alterações. Feedback e contribuições são muito bem-vindos!

## Como Começar

Existem dois caminhos principais para usar este projeto: criar seu próprio servidor ou desenvolver o framework.

### 1. Criando um Novo Servidor (Uso do Framework)

A maneira mais fácil de começar é usando o gerador de projetos. Em seu terminal, execute:

```bash
npx create-mcp-kit meu-servidor
```

Isso criará um novo diretório `meu-servidor` com um projeto pronto para usar. Siga as instruções no terminal para instalar as dependências e iniciar seu servidor.

### 2. Desenvolvendo o Framework (Contribuição)

Se você deseja contribuir para o desenvolvimento do `mcp-kit`, siga estes passos:

**Pré-requisitos:**
- Node.js (v18+)
- npm (v7+ ou superior)

1. **Instalar Dependências**
   Na raiz do projeto, rode o comando para instalar as dependências de todos os pacotes e criar os links simbólicos entre eles.
   ```bash
   npm install
   ```

2. **Compilar os Pacotes**
   Compile o `mcp-kit` e o `create-mcp-kit` para que eles possam ser usados pelo `example-server` e outros projetos.
   ```bash
   npm run build --workspaces
   ```

3. **Executar os Testes**
   Para rodar os testes de todos os pacotes:
   ```bash
   npm test --workspaces
   ```

4. **Iniciar o Servidor de Exemplo**
   Para ver o framework em ação, você pode iniciar o servidor de exemplo:
   ```bash
   npm start --workspace=example-server
   ```

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
