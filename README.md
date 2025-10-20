# MCP-Kit Monorepo

Welcome to the MCP-Kit monorepo! This repository is the home of **MCP-Kit**, an ecosystem of tools designed to build modern and efficient MCP (Model Context Protocol) servers in TypeScript.

## Philosophy

The goal of MCP-Kit is to provide a streamlined and developer-friendly experience for creating MCP servers. We believe in:

- **Declarative Programming**: Using decorators to define your server's capabilities in an intuitive and readable way.
- **Strong Typing**: Leveraging TypeScript and Zod to ensure type safety and data validation.
- **Automation**: Automating the registration of capabilities and other boilerplate tasks, so you can focus on your business logic.
- **Extensibility**: Designing the framework to be modular and extensible, allowing you to easily add new features and integrations.

## The Ecosystem

The MCP-Kit ecosystem is composed of two main packages:

- **`@viniciuscsouza/mcp-kit`**: The core of the project. It's a decorator-based framework (`@Provider`, `@Tool`) that simplifies the creation of all the logic for an MCP server.
- **`@viniciuscsouza/create-mcp-kit`**: A command-line tool (CLI) for quickly generating a new server project, pre-configured with MCP-Kit.

For more details on each package, please refer to their individual READMEs:

- [`packages/@viniciuscsouza/mcp-kit/README.md`](packages/@viniciuscsouza/mcp-kit/README.md)
- [`packages/@viniciuscsouza/create-mcp-kit/README.md`](packages/@viniciuscsouza/create-mcp-kit/README.md)

## Key Features

- **Decorator-Based Architecture**: Use `@Provider`, `@Tool`, and `@Prompt` to organize your code in a declarative and intuitive way.
- **Integrated Schema Validation**: Define the input schemas for your tools and prompts using **Zod**.
- **Automatic Registration**: The framework automatically registers your tools, prompts, and resources on the MCP server.
- **Complete Ecosystem**: Scaffolding tools (`create-mcp-kit`) to get projects started quickly.

## Project Status

**Under active development.** MCP-Kit is a new project and is constantly evolving. The API may change. Feedback and contributions are very welcome!

## Getting Started

There are two main ways to use this project: creating your own server or developing the framework.

### 1. Creating a New Server (Using the Framework)

The easiest way to get started is by using the project generator. In your terminal, run:

```bash
npx @viniciuscsouza/create-mcp-kit my-server
```

This will create a new `my-server` directory with a ready-to-use project. Follow the instructions in the terminal to install the dependencies and start your server. The internal documentation of the generated project (`knowledge/`) will provide all the necessary information about the architecture and development with MCP-Kit.

### 2. Developing the Framework (Contribution)

If you want to contribute to the development of `@viniciuscsouza/mcp-kit`, follow these steps:

**Prerequisites:**
- Node.js (v18+)
- npm (v7+ or higher)

1. **Install Dependencies**
   In the project root, run the command to install the dependencies for all packages and create the symbolic links between them.
   ```bash
   npm install
   ```

2. **Build the Packages**
   Compile `mcp-kit` and `create-mcp-kit` so they can be used.
   ```bash
   npm run build --workspaces
   ```

3. **Run the Tests**
   To run the tests for all packages:
   ```bash
   npm test --workspaces
   ```

## License

This project is distributed under the MIT license. See the `LICENSE` file for more details.
