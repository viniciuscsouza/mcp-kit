#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();

const knowledgeBaseFiles = [
  'mcp-knowledge-base-index.md',
  'modelcontextprotocol/docs/docs/learn/architecture.mdx',
  'modelcontextprotocol/docs/specification/draft/basic/lifecycle.mdx',
  'modelcontextprotocol/docs/specification/draft/basic/transports.mdx',
  'modelcontextprotocol/docs/docs/learn/server-concepts.mdx',
  'modelcontextprotocol/docs/specification/draft/server/tools.mdx',
  'modelcontextprotocol/docs/specification/draft/server/resources.mdx',
  'modelcontextprotocol/docs/specification/draft/server/prompts.mdx',
  'modelcontextprotocol/docs/docs/learn/client-concepts.mdx',
  'modelcontextprotocol/docs/specification/draft/client/sampling.mdx',
  'modelcontextprotocol/docs/specification/draft/client/elicitation.mdx',
  'modelcontextprotocol/docs/specification/draft/client/roots.mdx',
  'modelcontextprotocol/docs/specification/draft/basic/authorization.mdx',
  'modelcontextprotocol/docs/specification/draft/basic/security_best_practices.mdx',
  'typescript-sdk/README.md',
  'modelcontextprotocol/docs/docs/develop/build-server.mdx',
  'modelcontextprotocol/docs/legacy/tools/debugging.mdx',
  'modelcontextprotocol/docs/docs/tools/inspector.mdx',
  'npm-publishing-guide.md'
];

async function copyKnowledgeBase(projectPath: string) {
  const knowledgeSourcePath = path.resolve(__dirname, '..', '..', '..', 'knowledge'); // Adjust path to monorepo knowledge dir
  const knowledgeDestPath = path.join(projectPath, 'knowledge');

  if (!fs.existsSync(knowledgeDestPath)) {
    fs.mkdirSync(knowledgeDestPath, { recursive: true });
  }

  for (const file of knowledgeBaseFiles) {
    const sourceFile = path.join(knowledgeSourcePath, file);
    const destFile = path.join(knowledgeDestPath, file);
    
    // Ensure parent directory exists for the destination file
    const destDir = path.dirname(destFile);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(sourceFile)) {
      await fs.copy(sourceFile, destFile);
    } else {
      console.warn(`Arquivo de base de conhecimento não encontrado: ${sourceFile}`);
    }
  }
  console.log('Base de conhecimento copiada para o projeto.');
}

program
  .name('@viniciuscsouza/create-mcp-kit')
  .description('Cria um novo servidor para o MCP-Kit')
  .argument('<project-directory>', 'O diretório para criar o projeto')
  .action(async (projectDirectory: string) => {
    const projectPath = path.resolve(process.cwd(), projectDirectory);
    
    const templatePath = path.resolve(__dirname, '..', 'template');

    console.log(`Criando um novo servidor MCP-Kit em ${projectPath}...`);

    try {
      // Verifica se o diretório já existe e não está vazio
      if (fs.existsSync(projectPath)) {
        const files = fs.readdirSync(projectPath);
        if (files.length > 0) {
          console.error(`Erro: O diretório "${projectDirectory}" já existe e não está vazio.`);
          process.exit(1);
        }
      } else {
        fs.mkdirSync(projectPath, { recursive: true });
      }

      // Copia os arquivos do template
      await fs.copy(templatePath, projectPath);

      // Atualiza o nome do projeto no package.json
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectDirectory;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      // Renomeia o arquivo gitignore para .gitignore
      const gitignorePath = path.join(projectPath, 'gitignore');
      if (fs.existsSync(gitignorePath)) {
        fs.renameSync(gitignorePath, path.join(projectPath, '.gitignore'));
      }

      // Garante que o diretório 'logs' exista
      const logsPath = path.join(projectPath, 'logs');
      if (!fs.existsSync(logsPath)) {
        fs.mkdirSync(logsPath, { recursive: true });
      }

      // Copia a base de conhecimento para o novo projeto
      await copyKnowledgeBase(projectPath);      console.log('\nSucesso! Projeto criado em', projectPath);
      console.log('\nDentro do diretório, você pode executar vários comandos:\n');
      console.log(`  npm install`);
      console.log(`    Instala as dependências.\n`);
      console.log(`  npm run build`);
      console.log(`    Compila o projeto.\n`);
      console.log(`  npm test`);
      console.log(`    Executa os testes.\n`);
      console.log(`  npm run inspect`);
      console.log(`    Inicia o inspector para testar os recursos do servidor.\n`);
      console.log('Sugerimos que você comece digitando:\n');
      console.log(`  cd ${projectDirectory}`);
      console.log(`  npm install`);
      console.log(`  npm run build`);
      console.log(`  npm run inspect`);

    } catch (error) {
      console.error('Ocorreu um erro ao criar o projeto:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);
