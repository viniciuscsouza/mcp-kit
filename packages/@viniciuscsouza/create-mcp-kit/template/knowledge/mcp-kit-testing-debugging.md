# Guia de Testes e Depuração do MCP-Kit

Este guia aborda as melhores práticas para testar e depurar seu servidor MCP-Kit.

## Testes Unitários com Vitest

O MCP-Kit é configurado para usar Vitest para testes unitários. É uma boa prática testar cada `Tool`, `Prompt` e `Resource` individualmente.

### Estrutura de Testes
- Testes devem ser co-localizados com os arquivos de código-fonte, usando a convenção `*.test.ts`.
- Use `describe` para agrupar testes de um `Provider` e `it` para casos de teste específicos.

### Exemplo de Teste para `Tool`
```typescript
import { describe, it, expect } from 'vitest';
import { MyProvider } from '../src/providers/my.provider'; // Seu provider

describe('MyProvider Tools', () => {
  it('should correctly greet a person in English', async () => {
    const provider = new MyProvider();
    const result = await provider.greetPerson({ name: 'Alice', language: 'en' });
    expect(result.content[0].text).toBe('Hello, Alice!');
  });

  it('should correctly greet a person in Portuguese', async () => {
    const provider = new MyProvider();
    const result = await provider.greetPerson({ name: 'Carlos', language: 'pt' });
    expect(result.content[0].text).toBe('Olá, Carlos!');
  });
});
```

### Exemplo de Teste para `Prompt`
```typescript
import { describe, it, expect } from 'vitest';
import { MyProvider } from '../src/providers/my.provider'; // Seu provider

describe('MyProvider Prompts', () => {
  it('should generate a correct prompt for summarizing a document', async () => {
    const provider = new MyProvider();
    const result = await provider.summarizeDocumentPrompt({ documentTitle: 'Relatório Anual', length: 'short' });
    expect(result.messages[0].content.text).toContain('faça um resumo short do documento "Relatório Anual".');
  });
});
```

### Exemplo de Teste para `Resource`
```typescript
import { describe, it, expect } from 'vitest';
import { MyProvider } from '../src/providers/my.provider'; // Seu provider

describe('MyProvider Resources', () => {
  it('should list available resources', async () => {
    const provider = new MyProvider();
    const resources = await provider.listResources();
    expect(resources).toEqual(expect.arrayContaining([
      expect.objectContaining({ uri: 'mcp://my-service/info' }),
      expect.objectContaining({ uri: 'mcp://my-service/docs/{docId}' }),
    ]));
  });

  it('should read the service info resource', async () => {
    const provider = new MyProvider();
    const resource = await provider.readResource('mcp://my-service/info');
    expect(resource.contents[0].text).toContain('"status":"active"');
  });

  it('should throw an error for a non-existent resource', async () => {
    const provider = new MyProvider();
    await expect(provider.readResource('mcp://my-service/nonexistent')).rejects.toThrow('Resource not found');
  });
});
```

### Executando Testes
Para executar todos os testes:
```bash
npm test
```
Para executar testes em um arquivo específico:
```bash
npx vitest run <caminho/para/seu/arquivo.test.ts>
```
Para executar testes que correspondem a um padrão de nome:
```bash
npx vitest run -t "nome do teste"
```

## Depuração com MCP Inspector

O MCP Inspector é uma ferramenta interativa para testar e depurar servidores MCP.

### Iniciando o Servidor para Depuração
Seu `package.json` já deve conter um script `inspect`:
```json
"scripts": {
  "inspect": "npx @modelcontextprotocol/inspector node dist/main.js",
  // ...
}
```
Para iniciar seu servidor MCP-Kit e conectá-lo ao Inspector:
```bash
npm run build # Certifique-se de que o projeto está compilado
npm run inspect
```
O Inspector será aberto em seu navegador, permitindo que você interaja com suas `Tools`, `Prompts` e `Resources` e veja o tráfego de mensagens.

### Logs do Servidor
Seu servidor MCP-Kit usa `LoggingStdioServerTransport`, que redireciona todos os logs para um arquivo na pasta `logs/`.
- Verifique a pasta `logs/` no diretório raiz do seu projeto para arquivos `mcp-exchange-*.log`.
- Mensagens escritas para `console.error()` no seu código também serão capturadas pelo transporte de logging.

### Depuração de Código TypeScript
Para depurar o código TypeScript diretamente (e.g., com VS Code):
1.  Certifique-se de que seu `tsconfig.json` está configurado para gerar sourcemaps (`"sourceMap": true`).
2.  Configure seu ambiente de depuração (e.g., `launch.json` no VS Code) para anexar ao processo `node` que executa `dist/main.js`.

**Exemplo de `launch.json` para VS Code:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch MCP-Kit Server",
      "program": "${workspaceFolder}/dist/main.js",
      "preLaunchTask": "npm: build",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```
