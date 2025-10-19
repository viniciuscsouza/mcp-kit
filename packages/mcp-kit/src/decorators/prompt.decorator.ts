import { z } from 'zod';
import 'reflect-metadata';

// Chave única para armazenar a lista de prompts de um provider
export const PROMPTS_KEY = 'mcp-kit:prompts';

export interface PromptOptions {
  id: string;
  description?: string;
  inputSchema?: z.ZodObject<any>;
}

/**
 * Decorator de método que marca um método como um Prompt do MCP.
 * @param options As opções de configuração para o Prompt.
 */
export function Prompt(options: PromptOptions): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // Busca os metadados de prompts já existentes na classe, ou cria um array vazio
    const prompts = Reflect.getMetadata(PROMPTS_KEY, target.constructor) || [];

    // Adiciona os metadados do novo prompt à lista
    prompts.push({
      ...options,
      methodName: propertyKey
    });

    // Define a lista atualizada de prompts nos metadados da classe
    Reflect.defineMetadata(PROMPTS_KEY, prompts, target.constructor);
  };
}
