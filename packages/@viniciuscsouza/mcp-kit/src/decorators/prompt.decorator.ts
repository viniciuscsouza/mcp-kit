import 'reflect-metadata';
import { AnyZodObject } from '../types';

/**
 * @internal
 * A unique metadata key used to store prompt definitions on a provider class.
 * This key is used by the MCP-Kit framework to discover and register prompts.
 */
export const PROMPTS_KEY = '@viniciuscsouza/mcp-kit:prompts';

/**
 * Defines the configuration options for a prompt.
 */
export interface PromptOptions {
  /**
   * A unique identifier for the prompt. This ID is used to reference the prompt
   * within the MCP ecosystem.
   */
  id: string;

  /**
   * A human-readable description of what the prompt does. This is used by
   * models to understand the prompt's purpose.
   */
  description: string;

  /**
   * An optional Zod schema that defines the structure of the input expected
   * by the prompt's method. If provided, the framework will automatically
   * validate the input against this schema before executing the method.
   */
  inputSchema?: AnyZodObject;
}

/**
 * A method decorator that marks a class method as an MCP Prompt.
 *
 * When a method is decorated with `@Prompt`, it becomes a capability that can be
 * invoked by an MCP client to generate content. The framework handles the
 * necessary boilerplate for exposing the method and validating its inputs.
 *
 * The decorated method is expected to return a string or an object that can be
 * serialized into a string, which represents the generated content.
 *
 * @param options The configuration options for the prompt.
 *
 * @example
 * \`\`\`typescript
 * import { Prompt } from '@viniciuscsouza/mcp-kit';
 * import { z } from 'zod';
 *
 * class MyProvider {
 *   @Prompt({
 *     id: 'my-prompt',
 *     description: 'A simple prompt that generates a greeting.',
 *     inputSchema: z.object({
 *       name: z.string(),
 *     }),
 *   })
 *   myPrompt(input: { name: string }) {
 *     return `Hello, ${input.name}!`;
 *   }
 * }
 * \`\`\`
 */
export function Prompt(options: PromptOptions): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // Retrieve existing prompt metadata from the class, or create an empty array.
    const prompts = Reflect.getMetadata(PROMPTS_KEY, target.constructor) || [];

    // Add the metadata for the new prompt to the list.
    prompts.push({
      ...options,
      methodName: propertyKey,
    });

    // Save the updated list of prompts back to the class's metadata.
    Reflect.defineMetadata(PROMPTS_KEY, prompts, target.constructor);
  };
}