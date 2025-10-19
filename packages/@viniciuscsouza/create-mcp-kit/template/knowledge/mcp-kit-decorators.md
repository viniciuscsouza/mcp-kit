# Uso de Decoradores no MCP-Kit

O MCP-Kit faz uso extensivo de decoradores TypeScript para definir e configurar as capabilities de um servidor MCP de forma declarativa e concisa.

## Decoradores Disponíveis

### `@Provider(options: ProviderOptions)`
- **Propósito:** Marca uma classe como um provedor de funcionalidades MCP. Cada `Provider` atua como um contêiner para `Tools`, `Prompts` e `Resources` relacionados.
- **`options.name` (obrigatório):** Um identificador único para o provedor. Este nome será usado como namespace para as capabilities expostas por este provedor (e.g., `myprovider/mytool`).
- **`options.description` (opcional):** Uma breve descrição do provedor.

**Exemplo:**
```typescript
import { Provider } from '@viniciuscsouza/mcp-kit';

@Provider({
  name: 'myprovider',
  description: 'Um provedor de exemplo para funcionalidades diversas.'
})
export class MyProvider {
  // ... tools, prompts, resources
}
```

### `@Tool(options: ToolOptions)`
- **Propósito:** Marca um método assíncrono dentro de um `Provider` como uma "ferramenta" que pode ser invocada por agentes de IA.
- **`options.id` (obrigatório):** Um identificador único para a tool dentro do namespace do provedor.
- **`options.description` (obrigatório):** Uma descrição clara da funcionalidade da tool, essencial para a IA entender seu propósito.
- **`options.inputSchema` (obrigatório):** Um esquema Zod que define os parâmetros de entrada esperados para a tool. Isso garante a validação dos argumentos e ajuda a IA a formatar as chamadas corretamente.
- **`options.outputSchema` (opcional):** Um esquema Zod que define a estrutura da saída esperada da tool.

**Exemplo:**
```typescript
import { Tool } from '@viniciuscsouza/mcp-kit';
import { z } from 'zod';

@Tool({
  id: 'sum',
  description: 'Soma dois números e retorna o resultado.',
  inputSchema: z.object({
    a: z.number().describe('O primeiro número.'),
    b: z.number().describe('O segundo número.'),
  })
})
async sumNumbers({ a, b }: { a: number; b: number }) {
  return {
    content: [{ type: 'text', text: `Resultado: ${a + b}` }]
  };
}
```

### `@Prompt(options: PromptOptions)`
- **Propósito:** Marca um método assíncrono dentro de um `Provider` como um "prompt" que pode ser usado para gerar instruções ou templates de conversa para agentes de IA.
- **`options.id` (obrigatório):** Um identificador único para o prompt dentro do namespace do provedor.
- **`options.description` (obrigatório):** Uma descrição do prompt, explicando seu propósito e como ele deve ser usado.
- **`options.inputSchema` (opcional):** Um esquema Zod que define os parâmetros de entrada para customizar o prompt.

**Exemplo:**
```typescript
import { Prompt } from '@viniciuscsouza/mcp-kit';
import { z } from 'zod';

@Prompt({
  id: 'story-generator',
  description: 'Gera um prompt para a IA criar uma história sobre um tema específico.',
  inputSchema: z.object({
    topic: z.string().describe('O tema da história.'),
  })
})
async generateStoryPrompt({ topic }: { topic: string }) {
  return {
    messages: [{
      role: 'user',
      content: { type: 'text', text: `Crie uma história curta e criativa sobre "${topic}".` }
    }]
  };
}
```

### Recursos (`Resources`)
- **Propósito:** Embora não haja um decorador `@Resource` explícito, os recursos são definidos através da implementação dos métodos `listResources()` e `readResource(uri: string)` dentro de uma classe `Provider`.
- **`listResources()`:** Deve retornar um `Promise<ResourceDefinition[]>` listando todos os recursos estáticos ou templates de recursos que o provedor oferece.
- **`readResource(uri: string)`:** Deve retornar um `Promise<ResourceContent>` contendo o conteúdo do recurso solicitado pela URI.

**Exemplo:**
```typescript
import { Provider, ResourceDefinition, ResourceContent } from '@viniciuscsouza/mcp-kit';

@Provider({ name: 'data' })
export class DataProvider {
  async listResources(): Promise<ResourceDefinition[]> {
    return [{
      uri: 'mcp://data/status',
      name: 'Server Status',
      description: 'Status atual do servidor.',
      mimeType: 'application/json'
    }];
  }

  async readResource(uri: string): Promise<ResourceContent> {
    if (uri === 'mcp://data/status') {
      return {
        contents: [{ type: 'text', text: JSON.stringify({ status: 'ok' }) }]
      };
    }
    throw new Error('Resource not found');
  }
}
```
