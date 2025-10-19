#!/usr/bin/env node

import { Application } from '@viniciuscsouza/mcp-kit';
import { HelloProvider } from './providers';
import { LoggingStdioServerTransport } from './LoggingStdioServerTransport';
import packageJson from '../package.json';

/**
 * Ponto de entrada principal do servidor.
 */
function bootstrap() {
  // 1. Cria a instância da aplicação
  const app = new Application({
    name: packageJson.name,
    version: packageJson.version
  });

  // 2. Registra os providers da aplicação
  app.addProvider(HelloProvider);

  // 3. Inicia o servidor com o transporte de logging
  console.error('Iniciando servidor MCP-Kit com logging...');
  app.listen(new LoggingStdioServerTransport());
  console.error('Servidor rodando e aguardando conexões.');
}

bootstrap();