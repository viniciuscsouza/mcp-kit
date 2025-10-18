# Especificação do Framework MCP para TypeScript

Este documento descreve os requisitos e o design de um framework para facilitar a criação de servidores MCP (Model Context Protocol) usando TypeScript.

## 1. Objetivo Principal

O objetivo deste framework é **abstrair a complexidade** do protocolo MCP e do SDK base, oferecendo uma **experiência de desenvolvimento (Developer Experience - DX)** superior, moderna e intuitiva. O desenvolvedor deve focar na lógica de seus recursos, e não nos detalhes do protocolo.

## 2. Princípios de Design

- **Convenção sobre Configuração:** O framework deve fornecer padrões inteligentes e uma estrutura de projeto clara, minimizando a necessidade de configuração manual.
- **API Declarativa:** Utilizar recursos modernos do TypeScript, como decoradores, para definir capacidades de forma clara e com o mínimo de código.
- **Extensibilidade:** Embora o foco inicial seja `stdio`, o design deve permitir a adição de outros transportes (ex: HTTP, WebSockets) no futuro sem grandes refatorações.

## 3. Visão Geral: Servidor MCP e Capabilities

Um servidor MCP é um programa que expõe funcionalidades a um cliente através de um protocolo padrão. As funcionalidades expostas são chamadas de **"capabilities"**. As principais são:

- **Resources**: Expõe **dados** para fornecer contexto (ex: conteúdo de arquivos). São identificados por URIs e podem ser lidos pelo cliente.
- **Tools**: Expõe **funções** que podem ser executadas para interagir com sistemas externos (ex: chamar uma API).
- **Prompts**: Expõe **templates de texto** que podem ser preenchidos com argumentos para instruir um modelo de IA.

O nosso framework facilitará a criação e exposição de todas essas capabilities.

## 4. Experiência do Desenvolvedor (DX) - API Principal

A API pública se concentrará em decoradores e classes que permitem uma definição declarativa das capabilities. Uma única classe poderá prover todas as capabilities para um determinado domínio.

- **Decoradores Exportados:** `@Provider`, `@Tool`, `@Prompt`.
- **Classes Exportadas:** `Application`.

Uma classe decorada com `@Provider` pode conter métodos que definem `Tools`, `Prompts` e `Resources`. O exemplo a seguir é dividido em dois arquivos, como definido na estrutura do projeto.

### Exemplo de Provider (`src/providers/filesystem.provider.ts`):

```typescript
import { Provider, Prompt, Tool, ResourceDefinition, ResourceContent } from 'mcp-framework';
import * as fs from 'fs';

@Provider({
  name: 'filesystem',
  description: 'Provê capabilities para interagir com o sistema de arquivos.'
})
export class FilesystemProvider {

  // --- Definição de Tool ---
  @Tool({ id: 'writeFile' }) // ID final será 'filesystem.writeFile'
  async writeFile(path: string, content: string): Promise<void> {
    fs.writeFileSync(path, content);
  }

  // --- Definição de Prompt ---
  @Prompt({ id: 'summarizeFile' }) // ID final será 'filesystem.summarizeFile'
  async summarizeFile(path: string): Promise<string> {
    const content = fs.readFileSync(path, 'utf-8');
    return `Por favor, sumarize o seguinte arquivo:\n\n${content}`;
  }

  // --- Definições de Resources ---
  async listResources(): Promise<ResourceDefinition[]> {
    const files = fs.readdirSync('.'); // Lógica simplificada
    return files.map(f => ({ uri: `file://${f}`, name: f, mimeType: 'text/plain' }));
  }

  async readResource(uri: string): Promise<ResourceContent> {
    const path = uri.replace('file://', '');
    const text = fs.readFileSync(path, 'utf-8');
    return { uri, text };
  }
}
```

### Ponto de Entrada da Aplicação (`src/main.ts`):

```typescript
import { Application } from 'mcp-framework';
import { FilesystemProvider } from './providers/filesystem.provider';

// 1. Cria a única instância da aplicação
const app = new Application();

// 2. Registra os providers
app.addProvider(FilesystemProvider);
// ...pode adicionar outros providers aqui

// 3. Inicia o servidor
app.listen();
```

## 5. Camada de Transporte

- **Foco Inicial:** A primeira versão do framework suportará exclusivamente o transporte `stdio`.
- O método `app.listen()` sem parâmetros irá, por padrão, iniciar o servidor no modo `stdio`.

## 6. Scaffolding (Geração de Projeto)

- **Comando:** Um pacote `npx` será criado para gerar a estrutura inicial de um novo servidor.
- **Uso:** `npx create-mcp-server <nome-do-projeto>`
- **Estrutura Gerada:** O comando criará uma estrutura de diretórios e arquivos iniciais, organizada por **domínio de provider** e já configurada com **Vitest** para testes unitários.
  ```
  <nome-do-projeto>/
  ├── src/
  │   ├── providers/
  │   │   ├── index.ts            // Exporta todos os providers para o app principal
  │   │   └── hello.provider.ts   // Exemplo de provider
  │   └── main.ts                 // Ponto de entrada da aplicação
  ├── tests/
  │   └── hello.provider.test.ts  // Teste de exemplo para o hello.provider
  ├── package.json                // Incluirá vitest e um script de teste
  └── tsconfig.json
  ```

### Configuração de Testes

- **Framework:** [Vitest](https://vitest.dev/) será configurado como o executor de testes.
- **Dependências:** O `package.json` gerado incluirá `vitest` como uma dependência de desenvolvimento.
- **Scripts:** Um script `test` será adicionado ao `package.json`:
  ```json
  "scripts": {
    "start": "tsx src/main.ts",
    "test": "vitest"
  }
  ```
- **Exemplo de Teste (`tests/hello.provider.test.ts`):** O teste de exemplo demonstrará como testar a lógica de um provider de forma isolada, mostrando uma das grandes vantagens do design do framework (classes testáveis).
  ```typescript
  import { describe, it, expect } from 'vitest';
  import { HelloProvider } from '../src/providers/hello.provider';

  describe('HelloProvider', () => {
    it('should return a greeting from its sayHello tool', async () => {
      const provider = new HelloProvider();
      
      // Supondo que hello.provider.ts tenha um método @Tool chamado sayHello
      // que retorna uma string simples para este exemplo.
      const result = await provider.sayHello('World');

      expect(result.content[0].text).toBe('Hello, World!');
    });
  });
  ```
