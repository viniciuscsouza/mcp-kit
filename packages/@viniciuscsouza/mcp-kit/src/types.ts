import { z } from 'zod';
import type { CallToolResult, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import type { ReadResourceCallback } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Represents the definition of a resource, aligned with the MCP specification.
 * @deprecated This type is not currently used by the framework but is reserved for future use with resource providers.
 */
export interface ResourceDefinition {
  uri: string;
  name: string;
  description: string;
  mimeType?: string;
}

/**
 * Represents the content of a resource, aligned with the MCP specification.
 * @deprecated This type is not currently used by the framework but is reserved for future use with resource providers.
 */
export interface ResourceContent {
  contents: Array<
    | {
        uri: string;
        text: string;
        mimeType?: string;
        [key: string]: unknown;
      }
    | {
        uri: string;
        blob: string;
        mimeType?: string;
        [key: string]: unknown;
      }
  >;
  [key: string]: unknown;
}

/**
 * Represents the parameters that can be passed when reading a resource.
 * @deprecated This type is not currently used by the framework but is reserved for future use with resource providers.
 */
export type ResourceParams = Parameters<ReadResourceCallback>[1];

/**
 * Defines the interface for a resource provider.
 * @deprecated This interface is not currently used by the framework but is reserved for future use with resource providers.
 */
export interface IResourceProvider {
  listResources(): Promise<ResourceDefinition[]>;
  readResource(uri: string, params: ResourceParams): Promise<ResourceContent>;
}

/**
 * Represents the expected return type for a tool handler.
 * This is an alias for the `CallToolResult` type from the MCP SDK.
 */
export type ToolHandlerResult = CallToolResult;

/**
 * Represents the expected return type for a prompt handler.
 * This is an alias for the `GetPromptResult` type from the MCP SDK.
 */
export type PromptHandlerResult = GetPromptResult;

/**
 * A generic type representing any Zod object schema.
 * This is used to type the `inputSchema` and `outputSchema` options in the decorators.
 */
export type AnyZodObject = z.ZodObject<z.ZodRawShape>;
