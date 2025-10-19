import { describe, it, expect, vi, beforeEach } from 'vitest';

// Objeto para manter referências estáveis para nossos mocks
const mocks = {
  registerTool: vi.fn(),
  registerPrompt: vi.fn(),
  registerResource: vi.fn(),
  connect: vi.fn(),
  MockMcpServer: {} as any, 
};

// Mock do módulo do SDK
vi.mock('@modelcontextprotocol/sdk/server/mcp.js', () => {
  const MockMcpServer = vi.fn(() => ({
    registerTool: mocks.registerTool,
    registerPrompt: mocks.registerPrompt,
    registerResource: mocks.registerResource,
    connect: mocks.connect,
  }));
  mocks.MockMcpServer = MockMcpServer;
  return { McpServer: MockMcpServer };
});

describe('Application', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should discover and register all capabilities from a provider', async () => {
    // Arrange: Importar módulos dinamicamente após o mock
    const { Application } = await import('../src/application');
    const { Provider, Tool, Prompt } = await import('../src/decorators');
    const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');

    // Provider falso com todas as capabilities
    @Provider({ name: 'test-provider' })
    class MockProvider {
      @Tool({ id: 'my-tool' })
      toolMethod() { return { content: [] }; }

      @Prompt({ id: 'my-prompt' })
      promptMethod() { return 'a prompt'; }

      // Mock para listResources que retorna a definição de um recurso
      async listResources() { 
        return [{ uri: 'test://resource/1', name: 'resource1', description: 'My Test Resource' }]; 
      }
      // Mock para readResource que retorna o conteúdo
      async readResource(uri: string) { 
        return { uri, text: 'content of ' + uri }; 
      }
    }

    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(MockProvider);

    // Act
    await app.listen();

    // Assert
    expect(McpServer).toHaveBeenCalledTimes(1);

    // Assert: Verifica se registerResource foi chamado com os argumentos corretos
    expect(mocks.registerResource).toHaveBeenCalledWith(
      'test-provider.resource1', // Nome namespaced
      'test://resource/1',     // URI do recurso
      {
        description: 'My Test Resource',
        mimeType: undefined
      },
      expect.any(Function) // O callback (readResource)
    );

    // Limpa os mocks
    vi.resetModules();
  });
});
