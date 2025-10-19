// Importa os decoradores do framework (que estamos construindo)
// O path de importação será 'mcp-kit' quando o publicarmos no npm.
import { Provider, Tool } from '../mcp-kit';

@Provider({
  name: 'hello',
  description: 'Um provider de exemplo que oferece saudações.'
})
export class HelloProvider {

  @Tool({
    id: 'say', // O ID final, prefixado pelo framework, será 'hello.say'
    description: 'Gera uma saudação para um nome fornecido.'
    // Em um cenário real, o framework usaria um schema para validar os argumentos.
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
