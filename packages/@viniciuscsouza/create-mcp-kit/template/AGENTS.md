# Visão Geral para Agentes de IA

## Projeto Atual

O projeto atual é um servidor MCP (Model Context Protocol) em TypeScript construído com `@viniciuscsouza/create-mcp-kit`, uma ferramenta de scaffolding que simplifica a criação de novos projetos de servidor MCP. Ele implementa o framework `@viniciuscsouza/mcp-kit`, que fornece uma estrutura robusta e baseada em decoradores para o desenvolvimento de servidores MCP.

## Stack Tecnológica

- **Linguagem:** TypeScript
- **Ambiente:** Node.js
- **Gerenciador de Pacotes:** npm
- **Framework de Testes:** Vitest
- **Executor de TS:** tsx
- **Dependências Principais:**
    - `@modelcontextprotocol/sdk`: ^1.20.1
    - `@viniciuscsouza/mcp-kit`: latest
    - `zod`: ^3.23.8
- **Dependências de Desenvolvimento:**
    - `@types/node`: ^24.8.1
    - `tsx`: ^4.20.6
    - `typescript`: ^5.3.3
    - `vitest`: ^3.2.4

## Comandos

- `npm install`: Instala as dependências do projeto.
- `npm run build`: Compila o projeto TypeScript para JavaScript no diretório `dist/`.
- `npm test`: Executa todos os testes do projeto usando `vitest run`.
- `npm run inspect`: Inicia o servidor e o conecta ao MCP Inspector para depuração.

## Estrutura de Arquivos e Pastas

```
.
├── src/
│   ├── main.ts               # Ponto de entrada da aplicação
│   └── providers/
│       ├── hello.provider.ts   # Exemplo de um provider
│       └── index.ts            # Exporta todos os providers
├── tests/
│   └── hello.provider.test.ts # Testes para o hello.provider
├── package.json
├── tsconfig.json
└── logs/                     # Diretório para logs de execução do servidor
└── knowledge/                # Base de conhecimento específica do MCP-Kit
```

## Instruções para Agentes de IA

Para garantir uma interação eficiente e precisa com o projeto, os Agentes de IA devem seguir estas diretrizes:

1.  **Base de Conhecimento:**
    *   **Sempre** consulte o arquivo `knowledge/mcp-knowledge-base-index.md` antes de realizar qualquer tarefa para ter um ponto de partida centralizado. Este índice direcionará para a documentação específica do MCP-Kit.
    *   Para informações gerais sobre o Protocolo MCP e a SDK TypeScript, consulte a documentação oficial online (e.g., `modelcontextprotocol.io`).

2.  **Execução de Testes:**
    *   Para executar os testes do projeto, utilize o comando `vitest run`. Evite `vitest` sem `run`, pois ele pode entrar em modo "watch" e travar o ambiente.

3.  **Comandos Comuns:**
    *   Para instalar dependências: `npm install`
    *   Para construir o projeto: `npm run build`
    *   Para iniciar o servidor de exemplo: `npm start`

4.  **Consistência e Convenções:**
    *   Mantenha a consistência com o código existente, seguindo as convenções de estilo, nomenclatura e arquitetura.
    *   Ao modificar ou adicionar código, certifique-se de que ele se integre naturalmente ao contexto local.

## Referências
**Sempre** utilize o índice da base de conhecimento como ponto de partida para encontrar informações sobre o projeto e o protocolo MCP:

- [knowledge/mcp-knowledge-base-index.md](knowledge/mcp-knowledge-base-index.md): Índice central para toda a documentação relevante do projeto.

**Sempre** Utilize o servidor MCP `microsoft-learn/docs` quando estiver implementando recursos para o agente Github Copilot.