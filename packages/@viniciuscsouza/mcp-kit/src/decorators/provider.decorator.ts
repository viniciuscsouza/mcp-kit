import 'reflect-metadata';

/**
 * @internal
 * A unique metadata key used to store provider definitions on a class.
 * This key is used by the MCP-Kit framework to identify and configure providers.
 */
export const PROVIDER_KEY = '@viniciuscsouza/mcp-kit:provider';

/**
 * Defines the configuration options for a provider.
 */
export interface ProviderOptions {
  /**
   * The name of the provider. This name is used as a namespace for the
   * capabilities (tools and prompts) defined within the provider.
   */
  name: string;

  /**
   * A human-readable description of what the provider does. This is used for
   * documentation and can be helpful for developers.
   */
  description: string;
}

/**
 * A class decorator that marks a class as an MCP-Kit Provider.
 *
 * A Provider is a container for a set of related capabilities (Tools and Prompts).
 * The `@Provider` decorator is essential for the framework to discover and
 * register the capabilities defined within the class.
 *
 * @param options The configuration options for the provider.
 *
 * @example
 * \`\`\`typescript
 * import { Provider } from '@viniciuscsouza/mcp-kit';
 *
 * @Provider({
 *   name: 'my-provider',
 *   description: 'A provider for my awesome tools.',
 * })
 * export class MyProvider {
 *   // ... Tools and Prompts defined here
 * }
 * \`\`\`
 */
export function Provider(options: ProviderOptions): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(PROVIDER_KEY, options, target);
  };
}