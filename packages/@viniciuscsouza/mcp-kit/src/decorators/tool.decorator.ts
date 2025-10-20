import 'reflect-metadata';
import { AnyZodObject } from '../types';

/**
 * @internal
 * A unique metadata key used to store tool definitions on a provider class.
 * This key is used by the MCP-Kit framework to discover and register tools.
 */
export const TOOLS_KEY = '@viniciuscsouza/mcp-kit:tools';

/**
 * Defines the configuration options for a tool.
 */
export interface ToolOptions {
  /**
   * A unique identifier for the tool. This ID is used to reference the tool
   * within the MCP ecosystem.
   */
  id: string;

  /**
   * A human-readable description of what the tool does. This is used by
   * models to understand the tool's purpose.
   */
  description: string;

  /**
   * An optional Zod schema that defines the structure of the input expected
   * by the tool's method. If provided, the framework will automatically
   * validate the input against this schema.
   */
  inputSchema?: AnyZodObject;

  /**
   * An optional Zod schema that defines the structure of the output returned
   * by the tool's method. This can be used for documentation and validation.
   */
  outputSchema?: AnyZodObject;
}

/**
 * A method decorator that marks a class method as an MCP Tool.
 *
 * When a method is decorated with `@Tool`, it becomes a capability that can be
 * invoked by an MCP client. The framework handles the necessary boilerplate for
 * exposing the method, validating its inputs, and handling its execution.
 *
 * @param options The configuration options for the tool.
 *
 * @example
 * \`\`\`typescript
 * import { Tool } from '@viniciuscsouza/mcp-kit';
 * import { z } from 'zod';
 *
 * class MyProvider {
 *   @Tool({
 *     id: 'my-tool',
 *     description: 'A simple tool that adds two numbers.',
 *     inputSchema: z.object({
 *       a: z.number(),
 *       b: z.number(),
 *     }),
 *     outputSchema: z.object({
 *       result: z.number(),
 *     }),
 *   })
 *   myTool(input: { a: number; b: number }) {
 *     return { result: input.a + input.b };
 *   }
 * }
 * \`\`\`
 */
export function Tool(options: ToolOptions): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // Retrieve existing tool metadata from the class, or create an empty array.
    const tools = Reflect.getMetadata(TOOLS_KEY, target.constructor) || [];

    // Add the metadata for the new tool to the list.
    tools.push({
      ...options,
      methodName: propertyKey,
    });

    // Save the updated list of tools back to the class's metadata.
    Reflect.defineMetadata(TOOLS_KEY, tools, target.constructor);
  };
}