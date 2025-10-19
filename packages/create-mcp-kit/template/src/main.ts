#!/usr/bin/env node

import { Application } from 'mcp-kit';
import { HelloProvider } from './providers';

/**
 * Ponto de entrada principal do servidor.
 */
function bootstrap() {
  // 1. Cria a instância da aplicação
  const app = new Application({
    name: 'my-mcp-server',
    version: '0.1.0'
  });

  // 2. Registra os providers da aplicação
  app.addProvider(HelloProvider);

  // 3. Inicia o servidor (por padrão, usa StdioServerTransport)
  console.error('Iniciando servidor MCP-Kit...');
  app.listen();
  console.error('Servidor rodando e aguardando conexões.');
}

bootstrap();