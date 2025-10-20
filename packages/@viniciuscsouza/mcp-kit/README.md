# @viniciuscsouza/mcp-kit

`@viniciuscsouza/mcp-kit` is the heart of the MCP-Kit ecosystem. It provides a set of tools and a decorator-based architecture for building MCP (Model Context Protocol) servers in TypeScript in a modern and efficient way.

## What is MCP?

MCP (Model Context Protocol) is a protocol designed to facilitate communication between a language model (LLM) and a software agent. It allows the agent to expose its "capabilities" (tools, prompts, resources) in a structured way, so that the model can interact with them intelligently and autonomously. For more details, see the [MCP specification](https://docs.gemini.com/mcp).

## Key Features

- **Decorator-Based Architecture**: Use decorators like `@Provider`, `@Tool`, and `@Prompt` to organize your code in a declarative and intuitive way.
- **Integrated Schema Validation**: Define the input schemas for your tools and prompts using [Zod](https://zod.dev/), ensuring the security and predictability of interactions.
- **Automatic Capability Registration**: The framework automatically registers your tools, prompts, and resources on the MCP server, without the need for manual configuration.
- **Managed Lifecycle**: MCP-Kit manages the lifecycle of your providers, ensuring they are initialized and destroyed correctly.
- **Dependency Injection**: MCP-Kit provides a dependency injection mechanism to manage the dependencies between your providers.

## Getting Started

The easiest way to start using `@viniciuscsouza/mcp-kit` is through our project generator, `@viniciuscsouza/create-mcp-kit`. It creates a new server project with all the necessary structure to start developing.

To create a new project, run the following command:

```bash
npx @viniciuscsouza/create-mcp-kit my-server
```

This will create a new `my-server` directory with a ready-to-use project. Follow the instructions in the terminal to install the dependencies and start your server.

## Development

If you want to contribute to the development of `@viniciuscsouza/mcp-kit`, follow the steps below:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/viniciuscsouza/mcp-kit.git
   ```
2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Build the packages:**
   ```bash
   npm run build --workspaces
   ```
4. **Run the tests:**
   ```bash
   npm test --workspaces
   ```

## License

This project is distributed under the MIT license. See the `LICENSE` file for more details.
