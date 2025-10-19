#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();

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

      console.log('\nSucesso! Projeto criado em', projectPath);
      console.log('\nDentro do diretório, você pode executar vários comandos:\n');
      console.log(`  npm install`);
      console.log(`    Instala as dependências.\n`);
      console.log(`  npm inspect`);
      console.log(`    Inicia o MCP Inspector.\n`);
      console.log(`  npm test`);
      console.log(`    Executa os testes.\n`);
      console.log('Sugerimos que você comece digitando:\n');
      console.log(`  cd ${projectDirectory}`);
      console.log(`  npm install`);

    } catch (error) {
      console.error('Ocorreu um erro ao criar o projeto:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);
