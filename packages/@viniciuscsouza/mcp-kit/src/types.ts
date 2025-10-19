import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// Interfaces para ResourceDefinition e ResourceContent (movidas de provider.decorator.ts)
export interface ResourceDefinition {
  uri: string;
  name: string;
  description: string; // Tornar obrigatório
  mimeType?: string;
}

export interface ResourceContent {
  contents: {
    uri: string;
    text?: string; // Conteúdo de texto
    blob?: string; // Conteúdo binário (base64 encoded)
    mimeType?: string; // MimeType para o conteúdo individual
  }[];
}

// Tipo para os parâmetros passados para readResource
export type ResourceParams = { [key: string]: string | number | boolean | undefined };

// Interface para provedores de recursos
export interface IResourceProvider {
  listResources(): Promise<ResourceDefinition[]>;
  readResource(uri: string, params?: ResourceParams): Promise<ResourceContent>;
}

// Tipos para os resultados de Tool e Prompt (simplificados para o MCP-Kit)
// Estes são os tipos de retorno esperados dos métodos decorados
// Nota: McpServer['registerTool'] retorna void, precisamos do tipo de retorno do handler
// Para isso, vamos usar os tipos do SDK diretamente para os resultados dos handlers

// Tipos de retorno esperados para os handlers de Tool e Prompt
// Importar do SDK para garantir consistência
import type { CallToolResult, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

export type ToolHandlerResult = CallToolResult;
export type PromptHandlerResult = GetPromptResult;

// Tipos para os schemas Zod
export type AnyZodObject = z.ZodObject<z.ZodRawShape>;
