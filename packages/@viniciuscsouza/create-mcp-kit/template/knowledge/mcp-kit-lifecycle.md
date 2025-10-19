# Ciclo de Vida da Aplicação MCP-Kit

O ciclo de vida de uma aplicação MCP-Kit é gerenciado pela classe `Application`, que orquestra a inicialização, conexão e encerramento dos `Providers` e do transporte MCP.

## Fases do Ciclo de Vida

### 1. Inicialização da `Application`
- A instância da classe `Application` é criada, configurando o nome e a versão do servidor MCP.

### 2. Registro de `Providers`
- Os `Providers` (classes decoradas com `@Provider`) são adicionados à `Application` usando `app.addProvider()`.
- Durante este estágio, o MCP-Kit escaneia os `Providers` para descobrir os métodos decorados com `@Tool` e `@Prompt`, e os métodos `listResources`/`readResource`, registrando-os internamente.

### 3. Conexão ao Transporte MCP
- A `Application` se conecta a um transporte MCP (e.g., `LoggingStdioServerTransport` para comunicação via stdin/stdout).
- Durante a conexão, ocorre o handshake do protocolo MCP, onde as capabilities do servidor são negociadas com o cliente MCP. As `Tools`, `Prompts` e `Resources` descobertos nos `Providers` são anunciados ao cliente.

### 4. Operação
- Após a conexão bem- sucedida, o servidor MCP-Kit está pronto para receber requisições do cliente MCP.
- Quando uma `Tool` é invocada, um `Prompt` é solicitado ou um `Resource` é lido, a `Application` roteia a requisição para o método correspondente no `Provider` apropriado.
- Os métodos dos `Providers` executam a lógica de negócio e retornam os resultados no formato esperado pelo protocolo MCP.

### 5. Encerramento
- O servidor pode ser encerrado de forma graciosa, fechando a conexão com o transporte e liberando recursos. Isso geralmente ocorre quando o processo do servidor é finalizado.

## Exemplo de Fluxo de Inicialização

```typescript
import { Application } from '@viniciuscsouza/mcp-kit';
import { HelloProvider } from './providers'; // Seu provider
import { LoggingStdioServerTransport } from './LoggingStdioServerTransport'; // Seu transporte

function bootstrap() {
  // 1. Inicialização da Application
  const app = new Application({
    name: 'meu-servidor-mcp',
    version: '1.0.0'
  });

  // 2. Registro de Providers
  app.addProvider(HelloProvider);

  // 3. Conexão ao Transporte MCP
  console.error('Iniciando servidor MCP-Kit...');
  app.listen(new LoggingStdioServerTransport());
  console.error('Servidor rodando e aguardando conexões.');
}

bootstrap();
```
