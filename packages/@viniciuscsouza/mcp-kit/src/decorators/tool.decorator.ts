import 'reflect-metadata';

// Chave única para armazenar a lista de tools de um provider
import { z, ZodRawShape } from 'zod';

// Chave única para armazenar a lista de tools de um provider
export const TOOLS_KEY = '@viniciuscsouza/mcp-kit:tools';

export interface ToolOptions {
  id: string;
  description?: string;
  inputSchema?: z.ZodObject<any>;
}

/**
 * Decorator de método que marca um método como uma Tool do MCP.
 * @param options As opções de configuração para a Tool.
 */
export function Tool(options: ToolOptions): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // Busca os metadados de tools já existentes na classe, ou cria um array vazio
    const tools = Reflect.getMetadata(TOOLS_KEY, target.constructor) || [];

    // Adiciona os metadados da nova tool à lista
    tools.push({
      ...options,
      methodName: propertyKey
    });

    // Define a lista atualizada de tools nos metadados da classe
    Reflect.defineMetadata(TOOLS_KEY, tools, target.constructor);
  };
}
