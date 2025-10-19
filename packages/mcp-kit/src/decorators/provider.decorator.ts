import 'reflect-metadata';

// Chave única para armazenar os metadados do provider
export const PROVIDER_KEY = 'mcp-kit:provider';

export interface ProviderOptions {
  name: string;
  description?: string;
}

export interface ResourceDefinition {
  uri: string;
  name: string;
  description?: string;
  mimeType: string;
}

export interface ResourceContent {
  contents: {
    uri: string;
    text: string;
    mimeType?: string;
  }[];
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
