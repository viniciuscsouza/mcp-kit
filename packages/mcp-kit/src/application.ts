import 'reflect-metadata';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  PROVIDER_KEY,
  ProviderOptions,
  TOOLS_KEY,
  ToolOptions,
  PROMPTS_KEY,
  PromptOptions
} from './decorators';

// Tipos auxiliares
type ToolMetadata = ToolOptions & { methodName: string | symbol };
type PromptMetadata = PromptOptions & { methodName: string | symbol };

export interface ApplicationOptions {
  name: string;
  version: string;
}

export class Application {
  private providers: any[] = [];
  private readonly mcpServer: McpServer;

  constructor(options: ApplicationOptions) {
    this.mcpServer = new McpServer({
      name: options.name,
      version: options.version,
    });
  }

  public addProvider(provider: any): void {
    console.error(`[MCP-Kit] Registrando provider: ${provider.name}`);
    this.providers.push(provider);
  }

  public async listen(): Promise<void> {
    console.error('[MCP-Kit] Iniciando aplicação e processando providers...');
    
    for (const providerClass of this.providers) {
      const providerOptions: ProviderOptions = Reflect.getMetadata(PROVIDER_KEY, providerClass);
      if (!providerOptions) {
        console.error(`[MCP-Kit] Aviso: A classe ${providerClass.name} foi adicionada mas não possui o decorador @Provider. Ignorando.`);
        continue;
      }

      console.error(`[MCP-Kit] - Processando provider: ${providerOptions.name} (da classe ${providerClass.name})`);
      const instance = new providerClass();

      // Registra as Tools
      const tools: ToolMetadata[] = Reflect.getMetadata(TOOLS_KEY, providerClass) || [];
      for (const tool of tools) {
        const finalToolId = `${providerOptions.name}.${tool.id}`;
        console.error(`  - Registrando Tool: '${finalToolId}'`);
        this.mcpServer.registerTool(
          finalToolId,
          {
            description: tool.description,
            inputSchema: tool.inputSchema,
          },
          instance[tool.methodName].bind(instance)
        );
      }

      // Registra os Prompts
      const prompts: PromptMetadata[] = Reflect.getMetadata(PROMPTS_KEY, providerClass) || [];
      for (const prompt of prompts) {
        const finalPromptId = `${providerOptions.name}.${prompt.id}`;
        console.error(`  - Registrando Prompt: '${finalPromptId}'`);
        this.mcpServer.registerPrompt(
          finalPromptId,
          { description: prompt.description },
          instance[prompt.methodName].bind(instance)
        );
      }

      // Registra os Resources
      if (typeof instance.listResources === 'function' && typeof instance.readResource === 'function') {
        console.error(`  - Registrando Resources para ${providerOptions.name}...`);
        const resourceDefs = await instance.listResources();
        if (resourceDefs && Array.isArray(resourceDefs)) {
          for (const resourceDef of resourceDefs) {
            const resourceName = `${providerOptions.name}.${resourceDef.name}`;
            this.mcpServer.registerResource(
              resourceName,
              resourceDef.uri,
              { description: resourceDef.description, mimeType: resourceDef.mimeType },
              (uri, params) => instance.readResource(uri, params)
            );
          }
        }
      }
    }

    console.error('[MCP-Kit] Bootstrap completo. Conectando ao transporte stdio...');
    const transport = new StdioServerTransport();
    await this.mcpServer.connect(transport);
    console.error('[MCP-Kit] Servidor conectado e rodando.');
  }
}