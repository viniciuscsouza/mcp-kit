#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();

program
  .name('@viniciuscsouza/create-mcp-kit')
  .description('Creates a new MCP-Kit server project')
  .argument('<project-directory>', 'The directory to create the project in')
  .action(async (projectDirectory: string) => {
    const projectPath = path.resolve(process.cwd(), projectDirectory);
    
    // __dirname is not available in ES modules, so we derive it
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const templatePath = path.resolve(__dirname, '..', 'template');

    console.log(`
Creating a new MCP-Kit server in ${projectPath}...
`);

    try {
      // Check if the directory already exists and is not empty
      if (fs.existsSync(projectPath)) {
        const files = fs.readdirSync(projectPath);
        if (files.length > 0) {
          console.error(`❌ Error: The directory "${projectDirectory}" already exists and is not empty.`);
          process.exit(1);
        }
      } else {
        fs.mkdirSync(projectPath, { recursive: true });
      }

      // Copy template files
      await fs.copy(templatePath, projectPath);

      // Update the project name in package.json
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = path.basename(projectDirectory); // Use the directory name as the project name
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      // Rename gitignore to .gitignore
      const gitignorePath = path.join(projectPath, 'gitignore');
      if (fs.existsSync(gitignorePath)) {
        fs.renameSync(gitignorePath, path.join(projectPath, '.gitignore'));
      }

      // Ensure the 'logs' directory exists
      const logsPath = path.join(projectPath, 'logs');
      if (!fs.existsSync(logsPath)) {
        fs.mkdirSync(logsPath, { recursive: true });
      }

      console.log('✅ Success! Your new MCP-Kit project has been created.');
      console.log(`
To get started, run the following commands:
`);
      console.log(`  cd ${projectDirectory}`);
      console.log(`  npm install`);
      
      console.log('\nAvailable commands:\n');
      console.log(`  npm run build`);
      console.log(`    Builds the TypeScript source code for production.\n`);
      console.log(`  npm test`);
      console.log(`    Runs the test suite using Vitest.\n`);
      console.log(`  npm run inspect`);
      console.log(`    Starts the MCP Inspector to interact with your server.`);
      console.log(`    (Requires Node.js v22.7.5 or higher)\n`);
      
      console.log('Happy coding! ✨');

    } catch (error) {
      console.error('\n❌ An error occurred while creating the project:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);
