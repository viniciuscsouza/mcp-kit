// Importa os decoradores do framework (que estamos construindo)
// O path de importação será 'mcp-kit' quando o publicarmos no npm.
import { Provider, Tool } from 'mcp-kit';
import { z } from 'zod';

@Provider({
  name: 'hello',
  description: 'Um provider de exemplo que oferece saudações.'
})
export class HelloProvider {

  @Tool({
    id: 'say', 
    description: 'Gera uma saudação para um nome fornecido.',
    inputSchema: {
      name: z.string().describe('O nome para saudar.'),
    }
  })
  async sayHello({ name }: { name: string }) {
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
}
