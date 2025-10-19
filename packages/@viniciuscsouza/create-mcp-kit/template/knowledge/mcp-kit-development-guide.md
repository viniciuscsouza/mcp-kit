# Guia de Desenvolvimento com MCP-Kit

Este guia detalha como desenvolver funcionalidades para seu servidor MCP usando o framework MCP-Kit.

## 1. Estrutura Básica do Projeto

Um projeto MCP-Kit tipicamente segue esta estrutura:

```
.
├── src/
│   ├── main.ts               # Ponto de entrada da aplicação
│   ├── providers/            # Contém as classes Provider
│   │   ├── hello.provider.ts   # Exemplo de um provider
│   │   └── index.ts            # Exporta todos os providers
│   └── LoggingStdioServerTransport.ts # Transporte customizado (opcional)
├── tests/                    # Testes unitários
│   └── hello.provider.test.ts
├── package.json
├── tsconfig.json
└── knowledge/                # Base de conhecimento para a IA
```

## 2. Criando um `Provider`

Um `Provider` é uma classe TypeScript que agrupa `Tools`, `Prompts` e `Resources` relacionados.

1.  Crie um novo arquivo em `src/providers/` (e.g., `my.provider.ts`).
2.  Defina sua classe e decore-a com `@Provider`.
3.  Exporte a classe e adicione-a ao `src/providers/index.ts`.
4.  Registre o `Provider` na sua `Application` em `src/main.ts`.

**Exemplo (`src/providers/my.provider.ts`):**
```typescript
import { Provider, Tool, Prompt, ResourceDefinition, ResourceContent } from '@viniciuscsouza/mcp-kit';
import { z } from 'zod';

@Provider({
  name: 'my-service',
  description: 'Provedor de exemplo para demonstrar funcionalidades.'
})
export class MyProvider {
  // ... tools, prompts, resources aqui
}
```

## 3. Implementando `Tools`

`Tools` são métodos assíncronos dentro de um `Provider` que agentes de IA podem invocar.

1.  Crie um método assíncrono na sua classe `Provider`.
2.  Decore-o com `@Tool`, fornecendo `id`, `description` e `inputSchema` (usando Zod).
3.  O método deve receber um objeto com os argumentos definidos no `inputSchema`.
4.  Retorne um objeto no formato `CallToolResult` do protocolo MCP.

**Exemplo:**
```typescript
import { Tool } from '@viniciuscsouza/mcp-kit';
import { z } from 'zod';

@Tool({
  id: 'greet',
  description: 'Gera uma saudação personalizada.',
  inputSchema: z.object({
    name: z.string().describe('O nome da pessoa a ser saudada.'),
    language: z.enum(['en', 'pt']).default('en').describe('Idioma da saudação.'),
  })
})
async greetPerson({ name, language }: { name: string; language: 'en' | 'pt' }) {
  const greeting = language === 'pt' ? `Olá, ${name}!` : `Hello, ${name}!`;
  return {
    content: [{ type: 'text', text: greeting }]
  };
}
```

## 4. Implementando `Prompts`

`Prompts` são métodos assíncronos dentro de um `Provider` que geram templates de instruções para agentes de IA.

1.  Crie um método assíncrono na sua classe `Provider`.
2.  Decore-o com `@Prompt`, fornecendo `id`, `description` e opcionalmente `inputSchema`.
3.  O método deve retornar um objeto no formato `GetPromptResult` do protocolo MCP, contendo uma lista de `messages`.

**Exemplo:**
```typescript
import { Prompt } from '@viniciuscsouza/mcp-kit';
import { z } from 'zod';

@Prompt({
  id: 'summarize-document',
  description: 'Gera um prompt para a IA resumir um documento.',
  inputSchema: z.object({
    documentTitle: z.string().describe('O título do documento.'),
    length: z.enum(['short', 'medium', 'long']).default('medium').describe('Tamanho do resumo.'),
  })
})
async summarizeDocumentPrompt({ documentTitle, length }: { documentTitle: string; length: string }) {
  return {
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `Por favor, faça um resumo ${length} do documento "${documentTitle}".`
      }
    }]
  };
}
```

## 5. Implementando `Resources`

`Resources` são definidos por dois métodos dentro de um `Provider`: `listResources()` e `readResource(uri: string)`.

1.  Implemente `listResources()` para retornar uma lista de `ResourceDefinition` (recursos estáticos ou templates).
2.  Implemente `readResource(uri: string)` para retornar o `ResourceContent` do recurso solicitado.

**Exemplo:**
```typescript
import { ResourceDefinition, ResourceContent } from '@viniciuscsouza/mcp-kit';

// Dentro da classe MyProvider
async listResources(): Promise<ResourceDefinition[]> {
  return [
    {
      uri: 'mcp://my-service/info',
      name: 'Service Info',
      description: 'Informações gerais sobre o serviço.',
      mimeType: 'application/json',
    },
    {
      uri: 'mcp://my-service/docs/{docId}', // Exemplo de Resource Template
      name: 'Service Documentation',
      description: 'Documentação específica do serviço.',
      mimeType: 'text/markdown',
    }
  ];
}

async readResource(uri: string): Promise<ResourceContent> {
  if (uri === 'mcp://my-service/info') {
    return {
      contents: [{ type: 'text', text: JSON.stringify({ status: 'active', version: '1.0.0' }) }]
    };
  }
  if (uri.startsWith('mcp://my-service/docs/')) {
    const docId = uri.split('/').pop();
    return {
      contents: [{ type: 'text', text: `Conteúdo da documentação para ${docId}.` }]
    };
  }
  throw new Error('Resource not found');
}
```
