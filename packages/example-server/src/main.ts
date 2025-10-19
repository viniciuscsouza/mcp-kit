// Importa a classe principal do framework (que estamos construindo)
import { Application } from 'mcp-kit';

// Importa os providers definidos no projeto
import { HelloProvider } from './providers/hello.provider';

/**
 * Ponto de entrada principal do servidor.
 */
function bootstrap() {
  // 1. Cria a única instância da aplicação
  const app = new Application({
    name: 'example-server',
    version: '1.0.0'
  });

  // 2. Registra os providers da aplicação
  // O framework irá inspecionar HelloProvider em busca de @Tool, @Prompt, etc.
  app.addProvider(HelloProvider);

  // 3. Inicia o servidor para escutar por conexões (via stdio por padrão)
  console.error('Iniciando servidor MCP-Kit...');
  app.listen();
  console.error('Servidor rodando e aguardando conexões.');
}

bootstrap();
