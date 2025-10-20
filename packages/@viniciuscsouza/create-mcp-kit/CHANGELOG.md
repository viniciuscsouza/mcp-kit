# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.8] - 2025-10-19

### Changed

- **Refactored Knowledge Base:**
  - Removed general MCP and TypeScript SDK documentation from the template.
  - Added MCP-Kit-specific documentation (`mcp-kit-architecture.md`, `mcp-kit-decorators.md`, `mcp-kit-development-guide.md`, `mcp-kit-lifecycle.md`, `mcp-kit-testing-debugging.md`).
  - Updated `mcp-knowledge-base-index.md` to reference the new documentation and suggest online resources for general MCP/SDK information.
  - Updated `AGENTS.md` and `README.md` to reflect the documentation changes and remove references to the `npm start` command.
- **Updated Project Rules:**
  - Created `knowledge/mcp-kit-project-rules.md` in the monorepo with rules for generated projects.
  - Updated the monorepo's `AGENTS.md` to reference `mcp-kit-project-rules.md`.

## [0.0.1] - 2025-10-19

### Added

- Initial monorepo structure with npm workspaces.
- `@viniciuscsouza/mcp-kit` package with the core framework.
- `example-server` package with a sample `HelloProvider`.
- Test setup with `Vitest` for both packages.
- Unit test for the framework's `Application` class.
- Unit test for the example's `HelloProvider`.
- Initial design documentation in `FRAMEWORK_SPEC.md`.
- Project memory files in `knowledge/`.
