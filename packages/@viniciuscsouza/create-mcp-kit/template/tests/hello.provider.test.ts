import { describe, it, expect } from 'vitest';
import { HelloProvider } from '../src/providers/hello.provider';
import { ResourceDefinition, ResourceContent } from '@viniciuscsouza/mcp-kit/dist/types'; // Importar de dist/types

describe('HelloProvider', () => {
  it('should return a structured greeting from its sayHello tool', async () => {
    // 1. Arrange: Cria uma instância do nosso provider
    const provider = new HelloProvider();

    // 2. Act: Chama o método da ferramenta diretamente com os argumentos esperados
    const result = await provider.sayHello({ name: 'World' });

    // 3. Assert: Verifica se o resultado está correto
    expect(result).toBeTypeOf('object');
    expect(result.content).toBeInstanceOf(Array);
    expect(result.content.length).toBe(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toBe('Hello, World!');
  });

  it('should return a correct prompt from its greet prompt', async () => {
    const provider = new HelloProvider();
    const result = await provider.greet({ name: 'Galaxy' });
    expect(result).toBeTypeOf('object');
    expect(result.messages).toBeInstanceOf(Array);
    expect(result.messages.length).toBe(1);
    expect(result.messages[0].role).toBe('user');
    expect(result.messages[0].content.type).toBe('text');
    expect(result.messages[0].content.text).toContain('Gere uma saudação calorosa e amigável para **Galaxy**.');
  });

  it('should list available resources', async () => {
    const provider = new HelloProvider();
    const resources: ResourceDefinition[] = await provider.listResources();
    expect(resources).toBeInstanceOf(Array);
    expect(resources.length).toBe(1);
    expect(resources[0].uri).toBe('mcp://hello/welcome');
    expect(resources[0].name).toBe('Welcome Message');
    expect(resources[0].description).toBe('A simple welcome message.'); // description agora é obrigatório
  });

  it('should read a specific resource', async () => {
    const provider = new HelloProvider();
    const resource: ResourceContent = await provider.readResource('mcp://hello/welcome');
    expect(resource.contents).toBeInstanceOf(Array);
    expect(resource.contents.length).toBe(1);
    expect(resource.contents[0].uri).toBe('mcp://hello/welcome');
    expect(resource.contents[0].text).toBe('Welcome to the MCP-Kit example server!');
  });

  it('should throw an error for a non-existent resource', async () => {
    const provider = new HelloProvider();
    await expect(provider.readResource('mcp://hello/nonexistent')).rejects.toThrow('Resource not found');
  });
});
