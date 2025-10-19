// Importa os decoradores do framework (que estamos construindo)
// O path de importação será '@viniciuscsouza/mcp-kit' quando o publicarmos no npm.
import { Provider, Tool, Prompt, ResourceDefinition, ResourceContent } from '@viniciuscsouza/mcp-kit';
import { z } from 'zod';

@Provider({
  name: 'hello',
  description: 'Um provider de exemplo que oferece saudações.'
})
export class HelloProvider {

  @Tool({
    id: 'say',
    description: 'Gera uma saudação para um nome fornecido.',
    inputSchema: z.object({
      name: z.string().describe('O nome para saudar.'),
    })
  })
  async sayHello({ name }: { name:string }) {
    // A lógica da nossa ferramenta
    const message = `Hello, ${name}!`;

    // Ferramentas MCP retornam um objeto estruturado, conforme a especificação.
    return {
      content: [{
        type: 'text',
        text: message
      }]
    };
  }

  @Prompt({
    id: 'greet',
    description: 'Gera um prompt de saudação para um nome.',
    inputSchema: z.object({
      name: z.string().describe('O nome para saudar.'),
    })
  })
  async greet({ name }: { name: string }): Promise<{ messages: { role: 'user'; content: { type: 'text'; text: string } }[] }> {
    const markdownContent = `
# Comando para o Agente de IA

## Tarefa: Saudação Personalizada

**Instrução:** Gere uma saudação calorosa e amigável para **${name}**.

**Formato da Resposta:** A saudação deve ser um parágrafo curto e amigável.

**Exemplo:**

> Olá, ${name}! Espero que você tenha um dia fantástico.

## Contexto Adicional

- **Usuário:** ${name}
- **Data/Hora:** ${new Date().toISOString()}
- **Servidor:** example-server
`;

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: markdownContent,
          },
        },
      ],
    };
  }

  async listResources(): Promise<ResourceDefinition[]> {
    return [
      {
        uri: 'mcp://hello/welcome',
        name: 'Welcome Message',
        description: 'A simple welcome message.',
        mimeType: 'text/plain',
      }
    ];
  }

  async readResource(uri: string): Promise<ResourceContent> {
    console.error(`[HelloProvider] readResource called with uri: ${uri}`);
    if (uri === 'mcp://hello/welcome') {
      return {
        contents: [{
          uri,
          text: 'Welcome to the MCP-Kit example server!'
        }]
      };
    }
    throw new Error('Resource not found');
  }
}