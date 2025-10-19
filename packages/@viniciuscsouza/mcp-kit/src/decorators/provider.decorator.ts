import 'reflect-metadata';
import { ResourceDefinition } from '../types'; // Importar de types.ts

// Chave única para armazenar os metadados do provider
export const PROVIDER_KEY = '@viniciuscsouza/mcp-kit:provider';

export interface ProviderOptions {
  name: string;
  description: string; // Tornar obrigatório
}

/**
 * Decorator de classe que marca uma classe como um Provider do MCP-Kit.
 * @param options As opções de configuração para o Provider.
 */
export function Provider(options: ProviderOptions): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(PROVIDER_KEY, options, target);
  };
}