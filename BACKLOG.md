# Backlog de Melhorias para o Projeto MCP-Kit

Este documento lista as sugestões de melhorias e tarefas futuras identificadas durante a revisão geral do projeto. As prioridades podem ser ajustadas conforme a necessidade.

## 🚀 Prioridade Alta

### 1. Testes para `@viniciuscsouza/create-mcp-kit`
- **Descrição:** Atualmente, o pacote `@viniciuscsouza/create-mcp-kit` não possui testes. É crucial adicionar testes de integração e de erro para garantir a robustez da ferramenta de scaffolding.
- **Tipo:** Testes
- **Pacote:** `@viniciuscsouza/create-mcp-kit`
- **Detalhes:**
    - Testar o fluxo completo de criação de um projeto (diretório, cópia de arquivos, `package.json` atualizado, `.gitignore` renomeado, diretório `logs` criado).
    - Testar cenários de erro (diretório de destino existente e não vazio, erros de permissão).

## ✨ Prioridade Média

### 4. Melhorias na Documentação do Monorepo
- **Descrição:** Atualizar e gerenciar a documentação geral do monorepo para maior precisão e consistência.
- **Tipo:** Documentação
- **Pacote:** Monorepo
- **Detalhes:**
    - Atualizar a seção "Estrutura de Arquivos e Pastas" em `AGENTS.md` e `GEMINI.md` do monorepo para remover a menção ao `example-server`.
    - Gerenciar a duplicação entre `AGENTS.md` e `GEMINI.md` (e.g., fazer `GEMINI.md` ser um link para `AGENTS.md` ou um arquivo muito mais conciso que apenas aponta para `AGENTS.md`).
    - Atualizar os links de especificação em `knowledge/mcp-knowledge-base-index.md` e `mcp-protocol-reference.md` para apontar para versões estáveis (e.g., `2025-06-18`) em vez de "draft".
    - Adicionar uma referência ao `knowledge/mcp-kit-project-rules.md` no `knowledge/mcp-knowledge-base-index.md` do monorepo.

## 💡 Prioridade Baixa

### 5. Validação do Nome do Projeto no `create-mcp-kit`
- **Descrição:** Adicionar validação para garantir que o nome do projeto fornecido seja um nome de pacote npm válido.
- **Tipo:** Código, Melhoria
- **Pacote:** `@viniciuscsouza/create-mcp-kit`
- **Detalhes:** Implementar validação usando regex ou uma biblioteca como `validate-npm-package-name`.

### 6. Logging Mais Robusto no `@viniciuscsouza/mcp-kit`
- **Descrição:** Substituir o uso de `console.error` por um mecanismo de logging mais flexível e injetável para logs internos do framework.
- **Tipo:** Código, Refatoração
- **Pacote:** `@viniciuscsouza/mcp-kit`
- **Detalhes:** Permitir configuração de níveis de log, destinos (arquivo, console, etc.) e formatação.

### 7. Revisão de Conteúdo da Documentação do Template
- **Descrição:** Realizar uma revisão aprofundada do conteúdo dos arquivos de documentação específicos do MCP-Kit no template (`mcp-kit-architecture.md`, `mcp-kit-decorators.md`, etc.) para garantir clareza, precisão e completude.
- **Tipo:** Documentação
- **Pacote:** `@viniciuscsouza/create-mcp-kit` (template)
- **Detalhes:**
    - Em `mcp-kit-architecture.md`, ser mais explícito sobre como os recursos são definidos.
    - Em `mcp-kit-decorators.md`, incluir um exemplo de `outputSchema` para `@Tool`.

### 8. Automatizar Atualização de Documentação Externa
- **Descrição:** Criar um script ou processo para sincronizar periodicamente os diretórios `knowledge/modelcontextprotocol/` e `knowledge/typescript-sdk/` com seus repositórios upstream.
- **Tipo:** Automação, Manutenção
- **Pacote:** Monorepo
- **Detalhes:** Desenvolver um script que faça `git pull` ou use APIs para manter as cópias locais atualizadas.

### 9. Organização do `GEMINI.md`
- **Descrição:** Mover `GEMINI.md` para um diretório `.gemini/` na raiz do projeto para separar a documentação específica do agente da documentação do projeto.
- **Tipo:** Organização
- **Pacote:** Monorepo
- **Detalhes:** Criar o diretório `.gemini/` e mover o arquivo para lá.
