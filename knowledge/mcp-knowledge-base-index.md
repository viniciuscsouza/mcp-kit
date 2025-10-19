# Índice da Base de Conhecimento: Protocolo MCP e SDK TypeScript

Este documento serve como um índice de referência rápida para a documentação do Model Context Protocol (MCP) e a implementação de servidores com o SDK TypeScript, consolidando os links para os principais tópicos.

## Parte 1: Protocolo MCP - Referências Principais

### **Conceitos Fundamentais e Arquitetura**

- **Tópicos:** Papéis (Host, Client, Server), Data Layer (JSON-RPC), Transport Layer (stdio, Streamable HTTP), Ciclo de Vida da Conexão.
- **Referência Principal:** [Visão Geral da Arquitetura](modelcontextprotocol/docs/docs/learn/architecture.mdx)
- **Referências Adicionais:**
    - [Ciclo de Vida (Lifecycle)](modelcontextprotocol/docs/specification/draft/basic/lifecycle.mdx)
    - [Transportes (Transports)](modelcontextprotocol/docs/specification/draft/basic/transports.mdx)

### **Primitivas do Servidor**

- **Tópicos:** Tools, Resources e Prompts. Definição de schemas, templates dinâmicos, e anotações.
- **Referência Principal:** [Conceitos de Servidor](modelcontextprotocol/docs/docs/learn/server-concepts.mdx)
- **Especificações Detalhadas:**
    - [Ferramentas (Tools)](modelcontextprotocol/docs/specification/draft/server/tools.mdx)
    - [Recursos (Resources)](modelcontextprotocol/docs/specification/draft/server/resources.mdx)
    - [Prompts](modelcontextprotocol/docs/specification/draft/server/prompts.mdx)

### **Primitivas do Cliente**

- **Tópicos:** Sampling (solicitação de conclusões do LLM), Elicitation (solicitação de input do usuário) e Roots (escopo de diretórios).
- **Referência Principal:** [Conceitos de Cliente](modelcontextprotocol/docs/docs/learn/client-concepts.mdx)
- **Especificações Detalhadas:**
    - [Sampling](modelcontextprotocol/docs/specification/draft/client/sampling.mdx)
    - [Elicitation](modelcontextprotocol/docs/specification/draft/client/elicitation.mdx)
    - [Roots](modelcontextprotocol/docs/specification/draft/client/roots.mdx)

### **Autorização e Segurança**

- **Tópicos:** Fluxo de autorização com OAuth 2.1, Dynamic Client Registration (DCR), descoberta de metadados e prevenção de ataques comuns.
- **Referências:**
    - [Especificação de Autorização](modelcontextprotocol/docs/specification/draft/basic/authorization.mdx)
    - [Melhores Práticas de Segurança](modelcontextprotocol/docs/specification/draft/basic/security_best_practices.mdx)

## Parte 2: Implementação com SDK TypeScript - Referências

### **Guia Geral de Implementação**

- **Tópicos:** Configuração do ambiente, instanciação do `McpServer`, implementação de `Tools`, `Resources` e `Prompts`.
- **Referência Principal:** [README do SDK TypeScript](typescript-sdk/README.md)
- **Guia Prático:** [Guia de Construção de Servidor](modelcontextprotocol/docs/docs/develop/build-server.mdx)

### **Tópicos Avançados do SDK**

- **Tópicos:** Gerenciamento dinâmico de capabilities, debouncing de notificações, e uso de Elicitation e Sampling a partir do servidor.
- **Referência:** [Seção "Advanced Usage" no README do SDK TypeScript](typescript-sdk/README.md#advanced-usage)

### **Testes e Depuração**

- **Tópicos:** Estratégias de logging, testes unitários e uso de ferramentas de depuração.
- **Referências:**
    - [Guia de Depuração](modelcontextprotocol/docs/legacy/tools/debugging.mdx)
    - [Guia do MCP Inspector](modelcontextprotocol/docs/docs/tools/inspector.mdx)

## Parte 3: Ferramentas e Desenvolvimento

### **Publicação de Pacotes NPM**

- **Tópicos:** Processo de publicação, incremento de versão, execução de testes e correção de `package.json`.
- **Referência:** [Guia de Publicação de Pacotes NPM](npm-publishing-guide.md)
