# Servidor MCP-Kit

Bem-vindo ao seu novo servidor MCP (Model Context Protocol), construído com o framework **MCP-Kit**!

Este projeto foi gerado pela ferramenta `@viniciuscsouza/create-mcp-kit` e contém tudo o que você precisa para começar a desenvolver e expor suas próprias ferramentas, prompts e recursos para agentes de IA.

## Como Começar

**1. Instale as Dependências:**

```bash
npm install
```

**2. Inicie o Servidor em Modo de Desenvolvimento:**

```bash
npm start
```

O servidor irá iniciar e aguardar conexões de um cliente MCP (como um agente de IA ou uma ferramenta de depuração).

## Scripts Disponíveis

- `npm start`: Inicia o servidor em modo de desenvolvimento com execução via `tsx`.
- `npm run build`: Compila o projeto TypeScript para JavaScript no diretório `dist/`.
- `npm test`: Executa todos os testes do projeto usando `vitest`.

## Estrutura do Projeto

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
└── tsconfig.json
```

## Adicionando Funcionalidades

A lógica do seu servidor é organizada em **Providers**. Um provider é uma classe que agrupa um conjunto de `Tools`, `Prompts` e `Resources` relacionados.

O arquivo de exemplo `src/providers/hello.provider.ts` é o melhor lugar para começar.

### 1. Como Adicionar uma Nova Tool

Uma `Tool` é uma função que o agente de IA pode executar. Para criar uma nova tool, adicione um método à sua classe de provider e decore-o com `@Tool`.

**Exemplo: Adicionando uma tool que soma dois números em `hello.provider.ts`**

```typescript
// Dentro da classe HelloProvider

@Tool({
  id: 'add',
  description: 'Soma dois números e retorna o resultado.',
  inputSchema: z.object({
    a: z.number().describe('O primeiro número.'),
    b: z.number().describe('O segundo número.'),
  })
})
async sum({ a, b }: { a: number; b: number }) {
  const result = a + b;
  return {
    content: [{
      type: 'text',
      text: `O resultado da soma é ${result}`
    }]
  };
}
```

### 2. Como Adicionar um Novo Prompt

Um `Prompt` é um template de instrução que o servidor pode gerar para o agente de IA.

**Exemplo: Adicionando um prompt que pede uma história em `hello.provider.ts`**

```typescript
// Dentro da classe HelloProvider

@Prompt({
  id: 'story',
  description: 'Gera um prompt para o agente criar uma história sobre um tema.',
  inputSchema: z.object({
    topic: z.string().describe('O tema da história.'),
  })
})
async createStoryPrompt({ topic }: { topic: string }) {
  const promptText = `Por favor, escreva uma história curta e criativa sobre "${topic}".`;
  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: promptText,
        },
      },
    ],
  };
}
```

### 3. Como Adicionar um Resource

Um `Resource` expõe dados estáticos ou dinâmicos. Você precisa implementar dois métodos na classe do provider: `listResources` e `readResource`.

**Exemplo: Adicionando um novo resource `status` em `hello.provider.ts`**

1.  **Liste o resource em `listResources`:**

    ```typescript
    async listResources(): Promise<ResourceDefinition[]> {
      return [
        {
          uri: 'mcp://hello/welcome',
          name: 'Welcome Message',
          description: 'A simple welcome message.',
          mimeType: 'text/plain',
        },
        // Novo resource adicionado aqui
        {
          uri: 'mcp://hello/status',
          name: 'Server Status',
          description: 'Retorna o status atual do servidor.',
          mimeType: 'application/json',
        }
      ];
    }
    ```

2.  **Implemente a lógica de leitura em `readResource`:**

    ```typescript
    async readResource(uri: string): Promise<ResourceContent> {
      if (uri === 'mcp://hello/welcome') {
        // ... código existente
      }

      // Lógica para o novo resource
      if (uri === 'mcp://hello/status') {
        return {
          contents: [{
            uri,
            text: JSON.stringify({ status: 'ok', uptime: process.uptime() }),
            mimeType: 'application/json',
          }]
        };
      }

      throw new Error('Resource not found');
    }
    ```

## Escrevendo Testes

É uma boa prática testar todas as funcionalidades que você adiciona. O projeto usa **Vitest**.

**Exemplo: Adicionando um teste para a nova tool `sum` em `tests/hello.provider.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { HelloProvider } from '../src/providers/hello.provider';

describe('HelloProvider', () => {
  // ... testes existentes

  it('should sum two numbers correctly with its sum tool', async () => {
    // Arrange
    const provider = new HelloProvider();

    // Act
    const result = await provider.sum({ a: 5, b: 3 });

    // Assert
    expect(result.content[0].text).toBe('O resultado da soma é 8');
  });
});
```

---