import 'reflect-metadata';
import { McpServer, StdioServerTransport } from '@modelcontextprotocol/sdk/server';
import { ZodSchema } from 'zod';
import {
  PROVIDER_KEY,
  ProviderOptions,
  TOOLS_KEY,
  ToolOptions,
  PROMPTS_KEY,
  PromptOptions
} from './decorators';

// Tipos auxiliares para os metadados que armazenamos
type ToolMetadata = ToolOptions & { methodName: string | symbol };
type PromptMetadata = PromptOptions & { methodName: string | symbol };

export interface ApplicationOptions {
  name: string;
  version: string;
}

/**
 * A classe Application é o orquestrador central do framework MCP-Kit.
 * Ela gerencia o ciclo de vida e o registro de providers.
 */
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

  /**
   * Inicia o servidor MCP, processa os providers e começa a escutar por conexões.
   */
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

      // Registra as Tools encontradas
      const tools: ToolMetadata[] = Reflect.getMetadata(TOOLS_KEY, providerClass) || [];
      for (const tool of tools) {
        const finalToolId = `${providerOptions.name}.${tool.id}`;
        console.error(`  - Registrando Tool: '${finalToolId}'`);
        
        this.mcpServer.registerTool(
          finalToolId,
          {
            description: tool.description,
            // TODO: Adicionar suporte a schema no decorador @Tool
            inputSchema: {} as ZodSchema
          },
          instance[tool.methodName].bind(instance)
        );
      }

      // Registra os Prompts encontrados
      const prompts: PromptMetadata[] = Reflect.getMetadata(PROMPTS_KEY, providerClass) || [];
      for (const prompt of prompts) {
        const finalPromptId = `${providerOptions.name}.${prompt.id}`;
        console.error(`  - Registrando Prompt: '${finalPromptId}'`);

        this.mcpServer.registerPrompt(
          finalPromptId,
          {
            description: prompt.description,
            // TODO: Adicionar suporte a schema no decorador @Prompt
            argsSchema: {} as ZodSchema
          },
          instance[prompt.methodName].bind(instance)
        );
      }
    }

    console.error('[MCP-Kit] Bootstrap completo. Conectando ao transporte stdio...');
    const transport = new StdioServerTransport();
    await this.mcpServer.connect(transport);
    console.error('[MCP-Kit] Servidor conectado e rodando.');
  }
}
