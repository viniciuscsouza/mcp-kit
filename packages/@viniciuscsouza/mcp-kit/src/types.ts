import { z } from 'zod';
import type { CallToolResult, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import type { ReadResourceCallback } from '@modelcontextprotocol/sdk/server/mcp.js';

// ResourceDefinition alinhado com a especificação MCP
export interface ResourceDefinition {
  uri: string;
  name: string;
  description: string;
  mimeType?: string;
}

// ResourceContent alinhado com a especificação MCP e o que o SDK espera
// Replicando a estrutura de união de tipos que o SDK provavelmente usa
export interface ResourceContent {
  contents: Array<
    | {
        uri: string;
        text: string; // text é obrigatório se for um tipo de texto
        mimeType?: string;
        [key: string]: unknown;
      }
    | {
        uri: string;
        blob: string; // blob é obrigatório se for um tipo binário
        mimeType?: string;
        [key: string]: unknown;
      }
  >;
  [key: string]: unknown; // Para outras propriedades do SDK
}

// Tipo para os parâmetros passados para readResource
export type ResourceParams = Parameters<ReadResourceCallback>[1];

// Interface para provedores de recursos
export interface IResourceProvider {
  listResources(): Promise<ResourceDefinition[]>;
  readResource(uri: string, params: ResourceParams): Promise<ResourceContent>;
}

// Tipos de retorno esperados para os handlers de Tool e Prompt
export type ToolHandlerResult = CallToolResult;
export type PromptHandlerResult = GetPromptResult;

// Tipos para os schemas Zod
export type AnyZodObject = z.ZodObject<z.ZodRawShape>;
