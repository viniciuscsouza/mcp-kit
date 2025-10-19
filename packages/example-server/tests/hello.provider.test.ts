import { describe, it, expect } from 'vitest';
import { HelloProvider } from '../src/providers/hello.provider';

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
});
