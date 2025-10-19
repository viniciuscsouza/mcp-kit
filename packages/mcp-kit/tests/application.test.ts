import { describe, it, expect, vi } from 'vitest';
import { Application } from '../src/application';
import { Provider, Tool, Prompt } from '../src/decorators';
import { McpServer } from '@modelcontextprotocol/sdk/server';

// Mocka o módulo do SDK do MCP para isolar nosso teste
vi.mock('@modelcontextprotocol/sdk/server', () => {
  const mockRegisterTool = vi.fn();
  const mockRegisterPrompt = vi.fn();
  const mockConnect = vi.fn();
  
  const MockMcpServer = vi.fn(() => ({
    registerTool: mockRegisterTool,
    registerPrompt: mockRegisterPrompt,
    connect: mockConnect,
  }));

  return {
    McpServer: MockMcpServer,
    StdioServerTransport: vi.fn(),
  };
});

// Cria um provider falso que usa nossos decoradores
@Provider({ name: 'test-provider' })
class MockProvider {
  @Tool({ id: 'my-tool' })
  toolMethod() { return { content: [] }; }

  @Prompt({ id: 'my-prompt' })
  promptMethod() { return 'a prompt'; }
}

describe('Application', () => {
  it('should discover and register tools and prompts from a provider', async () => {
    // Arrange
    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(MockProvider);

    // Act
    await app.listen();

    // Assert
    const mcpServerInstance = (McpServer as any).mock.instances[0];

    // Verifica se o registerTool foi chamado com o ID namespaced correto
    expect(mcpServerInstance.registerTool).toHaveBeenCalledWith(
      'test-provider.my-tool',
      expect.any(Object),
      expect.any(Function)
    );

    // Verifica se o registerPrompt foi chamado com o ID namespaced correto
    expect(mcpServerInstance.registerPrompt).toHaveBeenCalledWith(
      'test-provider.my-prompt',
      expect.any(Object),
      expect.any(Function)
    );

    // Verifica se a conexão com o transporte foi chamada
    expect(mcpServerInstance.connect).toHaveBeenCalled();
  });
});
