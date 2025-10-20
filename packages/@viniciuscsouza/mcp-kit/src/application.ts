import 'reflect-metadata';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  PROVIDER_KEY,
  ProviderOptions,
  TOOLS_KEY,
  ToolOptions,
  PROMPTS_KEY,
  PromptOptions,
} from './decorators';
import { AnyZodObject, IResourceProvider, ResourceDefinition, ResourceParams } from './types';

/**
 * @internal
 * Represents the metadata for a tool, including its options and method name.
 */
type ToolMetadata = ToolOptions & { methodName: string | symbol; inputSchema?: AnyZodObject; outputSchema?: AnyZodObject };

/**
 * @internal
 * Represents the metadata for a prompt, including its options and method name.
 */
type PromptMetadata = PromptOptions & { methodName: string | symbol; inputSchema?: AnyZodObject };

/**
 * @internal
 * Represents a class that has been decorated with `@Provider`.
 */
type ProviderClass = { new (): any; name: string };

/**
 * Defines the configuration options for the main application.
 */
export interface ApplicationOptions {
  /**
   * The name of the application. This is used by the MCP server.
   */
  name: string;
  /**
   * The version of the application. This is used by the MCP server.
   */
  version: string;
}

/**
 * The main class of an MCP-Kit application.
 *
 * This class is responsible for discovering and registering providers,
 * their tools, and prompts, and then starting the MCP server.
 */
export class Application {
  /**
   * A list of provider classes that have been added to the application.
   */
  private providers: ProviderClass[] = [];
  /**
   * The underlying MCP server instance.
   */
  private readonly mcpServer: McpServer;

  /**
   * Creates a new MCP-Kit application.
   * @param options The configuration options for the application.
   */
  constructor(options: ApplicationOptions) {
    this.mcpServer = new McpServer({
      name: options.name,
      version: options.version,
    });
  }

  /**
   * Adds a provider to the application.
   *
   * A provider is a class decorated with `@Provider` that contains a set of
   * related tools and prompts.
   *
   * @param provider The provider class to add.
   */
  public addProvider(provider: ProviderClass): void {
    console.error(`[MCP-Kit] Registering provider: ${provider.name}`);
    this.providers.push(provider);
  }

  /**
   * Starts the application, registers all capabilities, and connects to the transport.
   *
   * This method iterates through all added providers, discovers their tools and
   * prompts using the metadata attached by the decorators, and registers them
   * with the MCP server.
   *
   * @param transport An optional transport to use. If not provided, a default
   * `StdioServerTransport` will be used.
   */
  public async listen(transport?: StdioServerTransport): Promise<void> {
    console.error('[MCP-Kit] Initializing application and processing providers...');

    for (const providerClass of this.providers) {
      const providerOptions: ProviderOptions = Reflect.getMetadata(PROVIDER_KEY, providerClass);
      if (!providerOptions) {
        console.warn(`[MCP-Kit] Warning: Class ${providerClass.name} was added but is not decorated with @Provider. It will be ignored.`);
        continue;
      }

      console.error(`[MCP-Kit] - Processing provider: ${providerOptions.name} (from class ${providerClass.name})`);
      const instance: IResourceProvider & { [key: string | symbol]: any } = new providerClass();

      // Register Tools
      const tools: ToolMetadata[] = Reflect.getMetadata(TOOLS_KEY, providerClass) || [];
      for (const tool of tools) {
        const finalToolId = `${providerOptions.name}/${tool.id}`;
        console.error(`  - Registering Tool: '${finalToolId}'`);
        this.mcpServer.registerTool(
          finalToolId,
          {
            description: tool.description,
            inputSchema: tool.inputSchema?.shape,
            outputSchema: tool.outputSchema?.shape,
          },
          instance[tool.methodName].bind(instance)
        );
      }

      // Register Prompts
      const prompts: PromptMetadata[] = Reflect.getMetadata(PROMPTS_KEY, providerClass) || [];
      for (const prompt of prompts) {
        const finalPromptId = `${providerOptions.name}/${prompt.id}`;
        console.error(`  - Registering Prompt: '${finalPromptId}'`);
        this.mcpServer.registerPrompt(
          finalPromptId,
          {
            description: prompt.description,
            argsSchema: prompt.inputSchema?.shape,
          },
          instance[prompt.methodName].bind(instance)
        );
      }

      // Register Resources (Experimental)
      // The resource provider feature is not yet fully integrated into the framework.
      // The following code is for future use and may not work as expected.
      if (typeof instance.listResources === 'function' && typeof instance.readResource === 'function') {
        console.error(`  - Registering Resources for ${providerOptions.name}...`);
        const resourceDefs: ResourceDefinition[] = await instance.listResources();
        if (resourceDefs && Array.isArray(resourceDefs)) {
          for (const resourceDef of resourceDefs) {
            const resourceId = `${providerOptions.name}/${resourceDef.name}`;
            this.mcpServer.registerResource(
              resourceId,
              resourceDef.uri,
              { description: resourceDef.description, mimeType: resourceDef.mimeType },
              (uri: URL, params: ResourceParams) => {
                console.error(`[MCP-Kit] readResource callback called with uri: ${uri.toString()}, params: ${JSON.stringify(params)}`);
                return instance.readResource(uri.toString(), params);
              }
            );
          }
        }
      }
    }

    console.error('[MCP-Kit] Bootstrap complete. Connecting to transport...');
    const finalTransport = transport || new StdioServerTransport();
    await this.mcpServer.connect(finalTransport);
    console.error('[MCP-Kit] Server connected and running.');
  }
}
