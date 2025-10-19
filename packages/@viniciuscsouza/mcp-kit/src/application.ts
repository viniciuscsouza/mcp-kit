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
import { AnyZodObject, IResourceProvider, ResourceDefinition, ResourceContent, ResourceParams } from './types';

// Tipos auxiliares
type ToolMetadata = ToolOptions & { methodName: string | symbol; inputSchema?: AnyZodObject; outputSchema?: AnyZodObject };
type PromptMetadata = PromptOptions & { methodName: string | symbol; inputSchema?: AnyZodObject };

// Tipo para classes de provedores
type ProviderClass = { new (): any; name: string; };

export interface ApplicationOptions {
  name: string;
  version: string;
}

export class Application {
  private providers: ProviderClass[] = [];
  private readonly mcpServer: McpServer;

  constructor(options: ApplicationOptions) {
    this.mcpServer = new McpServer({
      name: options.name,
      version: options.version,
    });
  }

  public addProvider(provider: ProviderClass): void {
    console.error(`[MCP-Kit] Registrando provider: ${provider.name}`);
    this.providers.push(provider);
  }

  public async listen(transport?: StdioServerTransport): Promise<void> {
    console.error('[MCP-Kit] Iniciando aplicação e processando providers...');
    
    for (const providerClass of this.providers) {
      const providerOptions: ProviderOptions = Reflect.getMetadata(PROVIDER_KEY, providerClass);
      if (!providerOptions) {
        console.error(`[MCP-Kit] Aviso: A classe ${providerClass.name} foi adicionada mas não possui o decorador @Provider. Ignorando.`);
        continue;
      }

      console.error(`[MCP-Kit] - Processando provider: ${providerOptions.name} (da classe ${providerClass.name})`);
      const instance: IResourceProvider & { [key: string | symbol]: any } = new providerClass();

      // Registra as Tools
      const tools: ToolMetadata[] = Reflect.getMetadata(TOOLS_KEY, providerClass) || [];
      for (const tool of tools) {
        const finalToolId = `${providerOptions.name}.${tool.id}`;
        console.error(`  - Registrando Tool: '${finalToolId}'`);
        this.mcpServer.registerTool(
          finalToolId,
          {
            description: tool.description,
            inputSchema: tool.inputSchema?.shape,
            outputSchema: tool.outputSchema?.shape, // Adicionado outputSchema
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
          {
            description: prompt.description,
            argsSchema: prompt.inputSchema?.shape,
          },
          instance[prompt.methodName].bind(instance)
        );
      }

      // Registra os Resources
      if (typeof instance.listResources === 'function' && typeof instance.readResource === 'function') {
        console.error(`  - Registrando Resources para ${providerOptions.name}...`);
        const resourceDefs: ResourceDefinition[] = await instance.listResources();
        if (resourceDefs && Array.isArray(resourceDefs)) {
          for (const resourceDef of resourceDefs) {
            const resourceId = `${providerOptions.name}.${resourceDef.name}`; // Usar name para ID interno
            this.mcpServer.registerResource(
              resourceId, // ID para o recurso
              resourceDef.uri,
              { description: resourceDef.description, mimeType: resourceDef.mimeType },
              (uri: URL, params: ResourceParams) => { // Tipagem correta para uri e params
                console.error(`[MCP-Kit] readResource callback called with uri: ${uri.toString()}, params: ${JSON.stringify(params)}`);
                return instance.readResource(uri.toString(), params);
              }
            );
          }
        }
      }
    }

    console.error('[MCP-Kit] Bootstrap completo. Conectando ao transporte...');
    const finalTransport = transport || new StdioServerTransport();
    await this.mcpServer.connect(finalTransport);
    console.error('[MCP-Kit] Servidor conectado e rodando.');
  }
}
