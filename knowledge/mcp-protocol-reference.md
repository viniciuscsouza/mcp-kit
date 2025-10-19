# Protocolo MCP e Implementação com SDK TypeScript

Este documento lista os tópicos que preciso estudar em detalhes para dominar o Model Context Protocol (MCP) e a implementação de servidores usando o SDK TypeScript.

## Parte 1: Compreensão Detalhada do Protocolo MCP

- **Conceitos Fundamentais:**
  - Entender a fundo os papéis e responsabilidades de **Host**, **Client** e **Server**.
  - Mapear a relação 1:1 entre Cliente e Servidor e como o Host gerencia múltiplos clientes.
  - *Referência: [Arquitetura do Protocolo](modelcontextprotocol/docs/docs/learn/architecture.mdx)*

- **Arquitetura do Protocolo:**
  - **Data Layer:**
    - Dominar o fluxo de mensagens JSON-RPC 2.0 (Requests, Responses, Notifications).
    - Estudar o ciclo de vida da conexão: `initialize`, `initialized`, `shutdown`.
    - Detalhar o processo de negociação de capabilities.
  - **Transport Layer:**
    - Implementação e diferenças entre `stdio` e `Streamable HTTP`.
    - Entender o uso de Server-Sent Events (SSE) no transporte HTTP.
- *Referências:*
    - *[Visão Geral da Arquitetura](modelcontextprotocol/docs/docs/learn/architecture.mdx)*
    - *[Ciclo de Vida (Lifecycle)](modelcontextprotocol/docs/specification/draft/basic/lifecycle.mdx)*
    - *[Transportes (Transports)](modelcontextprotocol/docs/specification/draft/basic/transports.mdx)*

- **Primitivas do Servidor:**
  - **Tools:**
    - Como definir `inputSchema` e `outputSchema` usando `zod`.
    - Diferença entre `content` e `structuredContent` no resultado.
    - O que são e como usar `ToolAnnotations` (`readOnlyHint`, `destructiveHint`, etc.).
    - Como retornar `ResourceLink` a partir de uma ferramenta.
  - **Resources:**
    - Diferença entre recursos estáticos e dinâmicos (`ResourceTemplate`).
    - Como implementar `list`, `read` e `subscribe` para recursos.
    - Como usar `uriTemplate` e prover `completions` для seus parâmetros.
  - **Prompts:**
    - Como criar templates de prompt com argumentos.
    - Como embutir `Resources` dinamicamente em uma mensagem de prompt.
- *Referências:*
    - *[Conceitos de Servidor](modelcontextprotocol/docs/docs/learn/server-concepts.mdx)*
    - *[Especificação de Ferramentas (Tools)](modelcontextprotocol/docs/specification/draft/server/tools.mdx)*
    - *[Especificação de Recursos (Resources)](modelcontextprotocol/docs/specification/draft/server/resources.mdx)*
    - *[Especificação de Prompts](modelcontextprotocol/docs/specification/draft/server/prompts.mdx)*

- **Primitivas do Cliente:**
  - **Sampling:** Entender o fluxo completo, incluindo `modelPreferences` e como o servidor pode solicitar conclusões do LLM através do cliente.
  - **Elicitation:** Como um servidor pode solicitar input do usuário de forma estruturada.
  - **Roots:** Como o cliente informa os diretórios de trabalho para o servidor.
  - *Referências:*
    - *[Conceitos de Cliente](modelcontextprotocol/docs/docs/learn/client-concepts.mdx)*
    - *[Especificação de Sampling](modelcontextprotocol/docs/specification/draft/client/sampling.mdx)*
    - *[Especificação de Elicitation](modelcontextprotocol/docs/specification/draft/client/elicitation.mdx)*
    - *[Especificação de Roots](modelcontextprotocol/docs/specification/draft/client/roots.mdx)*

- **Autorização e Segurança:**
  - Estudar o fluxo de autorização com OAuth 2.1, incluindo Dynamic Client Registration (DCR).
  - Entender o processo de descoberta de metadados do servidor de autorização (RFC8414).
  - Analisar as melhores práticas de segurança, especialmente a prevenção de ataques como "Confused Deputy" e "Token Passthrough".
  - *Referências:*
    - *[Especificação de Autorização](modelcontextprotocol/docs/specification/draft/basic/authorization.mdx)*
    - *[Melhores Práticas de Segurança](modelcontextprotocol/docs/specification/draft/basic/security_best_practices.mdx)*

## Parte 2: Implementação de Servidor MCP com SDK TypeScript

- **Configuração do Ambiente:**
  - Configurar um projeto TypeScript do zero com Node.js, npm/yarn e as dependências do `@modelcontextprotocol/sdk`.
  - Estruturar o projeto (tsconfig.json, package.json, etc.).

- **Construção de um Servidor Básico:**
  - Instanciar `McpServer` e definir suas informações (`name`, `version`).
  - Conectar um transporte (`StdioServerTransport` e `StreamableHTTPServerTransport`).
  - Lidar com o ciclo de vida da conexão no código.

- **Implementação de Capabilities:**
  - **`registerTool`**:
    - Criar uma ferramenta simples (ex: calculadora).
    - Criar uma ferramenta que interage com uma API externa (ex: API de clima).
    - Implementar o retorno de `structuredContent` e seu `outputSchema`.
  - **`registerResource`**:
    - Criar um recurso estático (ex: um arquivo de configuração).
    - Criar um recurso dinâmico com `ResourceTemplate` (ex: buscar um usuário por ID).
    - Implementar a função `complete` para autocompletar os parâmetros do template.
  - **`registerPrompt`**:
    - Criar um prompt simples com argumentos.
    - Criar um prompt complexo que embute um `Resource` dinamicamente.

- **Tópicos Avançados do SDK:**
  - **Servidores Dinâmicos:**
    - Como usar os métodos `.enable()`, `.disable()`, `.update()` e `.remove()` em `Tools`, `Resources` e `Prompts` após a inicialização.
    - Entender como o SDK lida com as notificações `list_changed`.
  - **Debouncing de Notificações:**
    - Como e quando ativar o `debouncedNotificationMethods` para otimizar a comunicação.
  - **Elicitation e Sampling:**
    - Implementar uma ferramenta que usa `server.server.elicitInput()` para obter dados do usuário.
    - Implementar uma ferramenta que usa `server.server.createMessage()` para fazer uma chamada a um LLM através do cliente.

- **Testes e Depuração:**
  - Escrever testes unitários para as capabilities implementadas usando `vitest` ou `jest`.
  - Utilizar o **MCP Inspector** para testar o servidor interativamente.
  - Praticar as estratégias de logging corretas para `stdio` (`console.error`) vs. `http`.

- *Referências Gerais para a Parte 2:*
  - *[README do SDK TypeScript](typescript-sdk/README.md)*
  - *[Guia de Construção de Servidor](modelcontextprotocol/docs/docs/develop/build-server.mdx)*
  - *[Guia de Depuração](modelcontextprotocol/docs/legacy/tools/debugging.mdx)*
  - *[Guia do MCP Inspector](modelcontextprotocol/docs/docs/tools/inspector.mdx)*
