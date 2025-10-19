import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod'; // Importar Zod para os schemas

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
    vi.resetModules();
  });

  it('should register tools from a provider', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider, Tool } = await import('../src/decorators');
    
    const mockInputSchema = z.object({ name: z.string() });
    const mockOutputSchema = z.object({ message: z.string() });

    @Provider({ name: 'test-provider', description: 'A test provider' })
    class MockProvider {
      @Tool({
        id: 'my-tool',
        description: 'A test tool',
        inputSchema: mockInputSchema,
        outputSchema: mockOutputSchema
      })
      toolMethod() { return { content: [] }; }
    }

    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(MockProvider);

    // Act
    await app.listen();

    // Assert
    expect(mocks.registerTool).toHaveBeenCalledWith(
      'test-provider.my-tool',
      {
        description: 'A test tool',
        inputSchema: mockInputSchema.shape,
        outputSchema: mockOutputSchema.shape,
      },
      expect.any(Function)
    );
  });

  it('should register prompts from a provider', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider, Prompt } = await import('../src/decorators');
    
    const mockInputSchema = z.object({ topic: z.string() });

    @Provider({ name: 'test-provider', description: 'A test provider' })
    class MockProvider {
      @Prompt({
        id: 'my-prompt',
        description: 'A test prompt',
        inputSchema: mockInputSchema
      })
      promptMethod() { return { messages: [] }; }
    }

    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(MockProvider);

    // Act
    await app.listen();

    // Assert
    expect(mocks.registerPrompt).toHaveBeenCalledWith(
      'test-provider.my-prompt',
      { description: 'A test prompt', argsSchema: mockInputSchema.shape },
      expect.any(Function)
    );
  });

  it('should register resources from a provider', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider } = await import('../src/decorators');

    @Provider({ name: 'test-provider', description: 'A test provider' })
    class MockProvider {
      async listResources() {
        return [{
          uri: 'test://resource/1',
          name: 'resource1',
          description: 'My Test Resource',
          mimeType: 'text/plain'
        }];
      }
      async readResource(uri: string, params: any) {
        return { contents: [{ uri, text: 'content of ' + uri }] };
      }
    }

    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(MockProvider);

    // Act
    await app.listen();

    // Assert
    expect(mocks.registerResource).toHaveBeenCalledWith(
      'test-provider.resource1',
      'test://resource/1',
      { description: 'My Test Resource', mimeType: 'text/plain' },
      expect.any(Function)
    );
  });

  it('should handle providers with no capabilities', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider } = await import('../src/decorators');

    @Provider({ name: 'empty-provider', description: 'An empty provider' })
    class EmptyProvider {}

    const app = new Application({ name: 'test-app', version: '10.0.0' });
    app.addProvider(EmptyProvider);

    // Act
    await app.listen();

    // Assert
    expect(mocks.registerTool).not.toHaveBeenCalled();
    expect(mocks.registerPrompt).not.toHaveBeenCalled();
    expect(mocks.registerResource).not.toHaveBeenCalled();
  });

  it('should ignore classes that are not providers', async () => {
    // Arrange
    const { Application } = await import('../src/application');

    class NotAProvider {}

    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(NotAProvider);

    // Act
    await app.listen();

    // Assert
    expect(mocks.registerTool).not.toHaveBeenCalled();
    expect(mocks.registerPrompt).not.toHaveBeenCalled();
    expect(mocks.registerResource).not.toHaveBeenCalled();
  });
});