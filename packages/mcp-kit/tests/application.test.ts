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
    vi.resetModules();
  });

  it('should register tools from a provider', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider, Tool } = await import('../src/decorators');
    
    @Provider({ name: 'test-provider' })
    class MockProvider {
      @Tool({ id: 'my-tool', description: 'A test tool' })
      toolMethod() { return { content: [] }; }
    }

    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(MockProvider);

    // Act
    await app.listen();

    // Assert
    expect(mocks.registerTool).toHaveBeenCalledWith(
      'test-provider.my-tool',
      { description: 'A test tool', inputSchema: undefined },
      expect.any(Function)
    );
  });

  it('should register prompts from a provider', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider, Prompt } = await import('../src/decorators');
    
    @Provider({ name: 'test-provider' })
    class MockProvider {
      @Prompt({ id: 'my-prompt', description: 'A test prompt' })
      promptMethod() { return 'a prompt'; }
    }

    const app = new Application({ name: 'test-app', version: '1.0.0' });
    app.addProvider(MockProvider);

    // Act
    await app.listen();

    // Assert
    expect(mocks.registerPrompt).toHaveBeenCalledWith(
      'test-provider.my-prompt',
      { description: 'A test prompt', argsSchema: undefined },
      expect.any(Function)
    );
  });

  it('should register resources from a provider', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider } = await import('../src/decorators');

    @Provider({ name: 'test-provider' })
    class MockProvider {
      async listResources() { 
        return [{ uri: 'test://resource/1', name: 'resource1', description: 'My Test Resource' }]; 
      }
      async readResource(uri: string) { 
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
      { description: 'My Test Resource', mimeType: undefined },
      expect.any(Function)
    );
  });

  it('should handle providers with no capabilities', async () => {
    // Arrange
    const { Application } = await import('../src/application');
    const { Provider } = await import('../src/decorators');

    @Provider({ name: 'empty-provider' })
    class EmptyProvider {}

    const app = new Application({ name: 'test-app', version: '1.0.0' });
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
