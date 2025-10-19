# Visão Geral

## Projeto Atual: MCP-Kit

O projeto atual é a concepção e planejamento de um novo framework chamado **MCP-Kit**, construído sobre o SDK de TypeScript do MCP.

**Objetivo:** Simplificar e acelerar o desenvolvimento de servidores MCP em TypeScript, utilizando uma abordagem moderna e declarativa.

**Características Principais:**
- **Arquitetura baseada em Decorators:** Usa `@Provider`, `@Tool` e `@Prompt` para definir capabilities.
- **Convenção sobre Configuração:** Adota convenções mandatórias (ex: `*.provider.ts`) para minimizar a configuração manual.
- **Scaffolding:** Inclui uma ferramenta de linha de comando (`npx create-mcp-kit`) para gerar a estrutura inicial do projeto.
- **Testes Integrados:** A estrutura gerada já vem com [Vitest](https://vitest.dev/) configurado para testes unitários.

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
├── AGENTS.md
├── FRAMEWORK_SPEC.md
├── knowledge/
│   ├── mcp-kit-design-memory.md
│   └── project-retrospective-memory.md
│   └── ... (outros arquivos de conhecimento)
├── package.json
├── package-lock.json
└── packages/
    ├── example-server/
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── src/
    │   │   ├── main.ts
    │   │   └── providers/
    │   │       ├── hello.provider.ts
    │   │       └── index.ts
    │   └── tests/
    │       └── hello.provider.test.ts
    └── mcp-kit/
        ├── package.json
        ├── tsconfig.json
        ├── src/
        │   ├── application.ts
        │   ├── index.ts
        │   └── decorators/
        │       ├── index.ts
        │       ├── prompt.decorator.ts
        │       ├── provider.decorator.ts
        │       └── tool.decorator.ts
        └── tests/
            └── application.test.ts
```

## Instruções

**Sempre** que aprender algo novo crie um arquivo `*-memory.md` na pasta `knowledge`.
**Guarde** informações importante do projeto em arquivos `*-context.md` na pasta `knowledge`.
**Crie** arquivos de especificação `*-spec.md` na pasta `knowledge`.

## Referências
**Sempre** utilize os arquivos de conhecimento disponíveis no projeto:

- [knowledge/project-retrospective-memory.md](knowledge/project-retrospective-memory.md): Retrospectiva completa do processo de criação e planejamento do MCP-Kit.
- [knowledge/mcp-kit-design-memory.md](knowledge/mcp-kit-design-memory.md): Resumo das decisões de design do framework MCP-Kit.
- [knowledge/llms-full.txt](knowledge/llms-full.txt): Uma visão geral do Model Context Protocol (MCP), o protocolo aberto que conecta aplicações de IA aos sistemas onde o contexto reside.
- [knowledge/modelcontextprotocol/ANTITRUST.md](knowledge/modelcontextprotocol/ANTITRUST.md): Política Antitruste do Projeto MCP para participantes e contribuidores.
- [knowledge/modelcontextprotocol/CODE_OF_CONDUCT.md](knowledge/modelcontextprotocol/CODE_OF_CONDUCT.md): O Código de Conduta do Pacto de Contribuintes para a comunidade MCP.
- [knowledge/modelcontextprotocol/CONTRIBUTING.md](knowledge/modelcontextprotocol/CONTRIBUTING.md): Guia para contribuir com a especificação, esquemas ou documentação do Model Context Protocol.
- [knowledge/modelcontextprotocol/MAINTAINERS.md](knowledge/modelcontextprotocol/MAINTAINERS.md): Lista dos mantenedores atuais no projeto Model Context Protocol.
- [knowledge/modelcontextprotocol/README.md](knowledge/modelcontextprotocol/README.md): README principal para o projeto Model Context Protocol (MCP), contendo a especificação, esquema e documentação oficial.
- [knowledge/modelcontextprotocol/SECURITY.md](knowledge/modelcontextprotocol/SECURITY.md): Política de segurança para relatar problemas de segurança no projeto MCP.
- [knowledge/modelcontextprotocol/blog/archetypes/default.md](knowledge/modelcontextprotocol/blog/archetypes/default.md): Arquétipo padrão para posts de blog no Hugo.
- [knowledge/modelcontextprotocol/blog/content/_index.md](knowledge/modelcontextprotocol/blog/content/_index.md): Página de índice para o blog do MCP.
- [knowledge/modelcontextprotocol/blog/content/posts/2025-07-29-prompts-for-automation.md](knowledge/modelcontextprotocol/blog/content/posts/2025-07-29-prompts-for-automation.md): Post de blog sobre o uso de Prompts MCP para construir automação de fluxo de trabalho.
- [knowledge/modelcontextprotocol/blog/content/posts/2025-07-31-governance-for-mcp.md](knowledge/modelcontextprotocol/blog/content/posts/2025-07-31-governance-for-mcp.md): Post de blog anunciando o novo modelo de governança para o MCP.
- [knowledge/modelcontextprotocol/blog/content/posts/2025-09-05-php-sdk.md](knowledge/modelcontextprotocol/blog/content/posts/2025-09-05-php-sdk.md): Post de blog anunciando o SDK oficial do PHP para MCP.
- [knowledge/modelcontextprotocol/blog/content/posts/2025-09-08-mcp-registry-preview.md](knowledge/modelcontextprotocol/blog/content/posts/2025-09-08-mcp-registry-preview.md): Post de blog apresentando o MCP Registry para descoberta de servidores.
- [knowledge/modelcontextprotocol/blog/content/posts/2025-09-26-mcp-next-version-update.md](knowledge/modelcontextprotocol/blog/content/posts/2025-09-26-mcp-next-version-update.md): Atualização sobre o cronograma e prioridades para a próxima versão do protocolo MCP.
- [knowledge/modelcontextprotocol/blog/content/posts/client_registration/index.md](knowledge/modelcontextprotocol/blog/content/posts/client_registration/index.md): Post de blog sobre a evolução do Registro de Cliente OAuth no Protocolo de Contexto do Modelo.
- [knowledge/modelcontextprotocol/blog/content/posts/welcome-to-mcp-blog.md](knowledge/modelcontextprotocol/blog/content/posts/welcome-to-mcp-blog.md): Post de boas-vindas para o blog oficial do Model Context Protocol (MCP).
- [knowledge/modelcontextprotocol/docs/about/index.mdx](knowledge/modelcontextprotocol/docs/about/index.mdx): Introdução ao Model Context Protocol (MCP).
- [knowledge/modelcontextprotocol/docs/clients.mdx](knowledge/modelcontextprotocol/docs/clients.mdx): Uma lista de aplicações que suportam integrações MCP.
- [knowledge/modelcontextprotocol/docs/community/antitrust.mdx](knowledge/modelcontextprotocol/docs/community/antitrust.mdx): Política Antitruste do Projeto MCP para participantes e contribuidores.
- [knowledge/modelcontextprotocol/docs/community/communication.mdx](knowledge/modelcontextprotocol/docs/community/communication.mdx): Estratégia de comunicação e framework para a comunidade do Model Context Protocol.
- [knowledge/modelcontextprotocol/docs/community/governance.mdx](knowledge/modelcontextprotocol/docs/community/governance.mdx): Informações sobre a estrutura de governança do Model Context Protocol.
- [knowledge/modelcontextprotocol/docs/community/sep-guidelines.mdx](knowledge/modelcontextprotocol/docs/community/sep-guidelines.mdx): Diretrizes da Proposta de Melhoria da Especificação (SEP) para propor mudanças no MCP.
- [knowledge/modelcontextprotocol/docs/community/working-interest-groups.mdx](knowledge/modelcontextprotocol/docs/community/working-interest-groups.mdx): Informações sobre Grupos de Trabalho e Grupos de Interesse dentro da estrutura de governança do MCP.
- [knowledge/modelcontextprotocol/docs/development/roadmap.mdx](knowledge/modelcontextprotocol/docs/development/roadmap.mdx): Roteiro para a evolução do Model Context Protocol.
- [knowledge/modelcontextprotocol/docs/docs/develop/build-client.mdx](knowledge/modelcontextprotocol/docs/docs/develop/build-client.mdx): Tutorial sobre como construir um cliente MCP.
- [knowledge/modelcontextprotocol/docs/docs/develop/build-server.mdx](knowledge/modelcontextprotocol/docs/docs/develop/build-server.mdx): Tutorial sobre como construir um servidor MCP.
- [knowledge/modelcontextprotocol/docs/docs/develop/connect-local-servers.mdx](knowledge/modelcontextprotocol/docs/docs/develop/connect-local-servers.mdx): Guia sobre como se conectar a servidores MCP locais.
- [knowledge/modelcontextprotocol/docs/docs/develop/connect-remote-servers.mdx](knowledge/modelcontextprotocol/docs/docs/develop/connect-remote-servers.mdx): Guia sobre como se conectar a servidores MCP remotos.
- [knowledge/modelcontextprotocol/docs/docs/getting-started/intro.mdx](knowledge/modelcontextprotocol/docs/docs/getting-started/intro.mdx): Introdução ao que é o Model Context Protocol (MCP).
- [knowledge/modelcontextprotocol/docs/docs/learn/architecture.mdx](knowledge/modelcontextprotocol/docs/docs/learn/architecture.mdx): Visão geral da arquitetura do Model Context Protocol (MCP).
- [knowledge/modelcontextprotocol/docs/docs/learn/client-concepts.mdx](knowledge/modelcontextprotocol/docs/docs/learn/client-concepts.mdx): Explicação dos clientes MCP e suas principais características.
- [knowledge/modelcontextprotocol/docs/docs/learn/server-concepts.mdx](knowledge/modelcontextprotocol/docs/docs/learn/server-concepts.mdx): Explicação dos servidores MCP e suas principais características.
- [knowledge/modelcontextprotocol/docs/docs/reference/client.mdx](knowledge/modelcontextprotocol/docs/docs/reference/client.mdx): Documentação de referência para clientes MCP (conteúdo de placeholder).
- [knowledge/modelcontextprotocol/docs/docs/reference/server.mdx](knowledge/modelcontextprotocol/docs/docs/reference/server.mdx): Documentação de referência para servidores MCP (conteúdo de placeholder).
- [knowledge/modelcontextprotocol/docs/docs/sdk.mdx](knowledge/modelcontextprotocol/docs/docs/sdk.mdx): Lista de SDKs oficiais para construir com o Model Context Protocol.
- [knowledge/modelcontextprotocol/docs/docs/tools/inspector.mdx](knowledge/modelcontextprotocol/docs/docs/tools/inspector.mdx): Guia aprofundado para usar o MCP Inspector para testes e depuração.
- [knowledge/modelcontextprotocol/docs/docs/tutorials/security/authorization.mdx](knowledge/modelcontextprotocol/docs/docs/tutorials/security/authorization.mdx): Guia para entender e implementar autorização no MCP.
- [knowledge/modelcontextprotocol/docs/docs/tutorials/use-local-mcp-server.mdx](knowledge/modelcontextprotocol/docs/docs/tutorials/use-local-mcp-server.mdx): Um guia sobre como usar um servidor MCP local (conteúdo pendente).
- [knowledge/modelcontextprotocol/docs/examples.mdx](knowledge/modelcontextprotocol/docs/examples.mdx): Uma lista de exemplos de servidores e implementações MCP.
- [knowledge/modelcontextprotocol/docs/faqs.mdx](knowledge/modelcontextprotocol/docs/faqs.mdx): Perguntas Frequentes sobre o MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/architecture.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/architecture.mdx): Documentação legada sobre a arquitetura principal do MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/elicitation.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/elicitation.mdx): Documentação legada sobre o conceito de elicitation no MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/prompts.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/prompts.mdx): Documentação legada sobre prompts no MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/resources.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/resources.mdx): Documentação legada sobre recursos no MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/roots.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/roots.mdx): Documentação legada sobre roots no MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/sampling.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/sampling.mdx): Documentação legada sobre amostragem (sampling) no MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/tools.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/tools.mdx): Documentação legada sobre ferramentas no MCP.
- [knowledge/modelcontextprotocol/docs/legacy/concepts/transports.mdx](knowledge/modelcontextprotocol/docs/legacy/concepts/transports.mdx): Documentação legada sobre transportes no MCP.
- [knowledge/modelcontextprotocol/docs/legacy/tools/debugging.mdx](knowledge/modelcontextprotocol/docs/legacy/tools/debugging.mdx): Guia legado para depuração de integrações MCP.
- [knowledge/modelcontextprotocol/docs/sdk/java/mcp-client.mdx](knowledge/modelcontextprotocol/docs/sdk/java/mcp-client.mdx): Documentação para o SDK do Cliente MCP Java.
- [knowledge/modelcontextprotocol/docs/sdk/java/mcp-overview.mdx](knowledge/modelcontextprotocol/docs/sdk/java/mcp-overview.mdx): Visão geral do SDK Java do MCP.
- [knowledge/modelcontextprotocol/docs/sdk/java/mcp-server.mdx](knowledge/modelcontextprotocol/docs/sdk/java/mcp-server.mdx): Documentação para o SDK do Servidor MCP Java.
- [knowledge/modelcontextprotocol/docs/snippets/snippet-intro.mdx](knowledge/modelcontextprotocol/docs/snippets/snippet-intro.mdx): Introdução ao uso de snippets na documentação.
- [knowledge/modelcontextprotocol/docs/specification/versioning.mdx](knowledge/modelcontextprotocol/docs/specification/versioning.mdx): Informações sobre o versionamento do MCP.
- [knowledge/modelcontextprotocol/docs/tutorials/building-a-client-node.mdx](knowledge/modelcontextprotocol/docs/tutorials/building-a-client-node.mdx): Tutorial para construir um cliente MCP com Node.js.
- [knowledge/modelcontextprotocol/docs/tutorials/building-mcp-with-llms.mdx](knowledge/modelcontextprotocol/docs/tutorials/building-mcp-with-llms.mdx): Tutorial para construir servidores e clientes MCP com a ajuda de LLMs.
- [knowledge/typescript-sdk/CLAUDE.md](knowledge/typescript-sdk/CLAUDE.md): Guia para o SDK TypeScript do MCP.
- [knowledge/typescript-sdk/CODE_OF_CONDUCT.md](knowledge/typescript-sdk/CODE_OF_CONDUCT.md): Código de Conduta para o projeto do SDK TypeScript do MCP.
- [knowledge/typescript-sdk/CONTRIBUTING.md](knowledge/typescript-sdk/CONTRIBUTING.md): Diretrizes de contribuição para o SDK TypeScript do MCP.
- [knowledge/typescript-sdk/README.md](knowledge/typescript-sdk/README.md): README para o SDK TypeScript do MCP.
- [knowledge/typescript-sdk/SECURITY.md](knowledge/typescript-sdk/SECURITY.md): Política de segurança para o SDK TypeScript do MCP.
- [knowledge/typescript-sdk/src/examples/README.md](knowledge/typescript-sdk/src/examples/README.md): README para os exemplos no SDK TypeScript do MCP.

**Sempre** Utilize o servidor MCP `microsoft-learn/docs` quando estiver implementando recursos para o agente Github Copilot.