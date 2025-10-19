# Como Contribuir para o MCP-Kit

Ficamos muito felizes com seu interesse em contribuir para o MCP-Kit! Toda contribuição é bem-vinda, desde a correção de bugs e a melhoria da documentação até a proposição de novas funcionalidades.

Este documento é um guia para ajudar você a começar.

## Código de Conduta

Este projeto e todos que participam dele são regidos pelo nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em seguir seus termos.

## Como Começar

As contribuições para o projeto são feitas usando o fluxo de trabalho de Pull Requests do GitHub.

1.  **Faça um Fork** do repositório para sua própria conta do GitHub.
2.  **Clone** seu fork para sua máquina local (`git clone https://github.com/SEU_USUARIO/mcp-kit.git`).
3.  **Crie uma Branch** para sua alteração (`git checkout -b minha-feature-incrivel`).
4.  **Faça suas alterações** e realize commits (`git commit -m 'Adiciona minha feature incrível'`).
5.  **Envie suas alterações** para o seu fork (`git push origin minha-feature-incrivel`).
6.  **Abra um Pull Request** no repositório principal do MCP-Kit.

## Configurando o Ambiente de Desenvolvimento

Para trabalhar no código do MCP-Kit, você precisará configurar o ambiente de desenvolvimento local. Este é um monorepo gerenciado com npm workspaces.

**Pré-requisitos:**
- Node.js (v18+)
- npm (v7+)

1.  **Instale as Dependências:** Na raiz do projeto, instale todas as dependências dos pacotes.
    ```bash
    npm install
    ```

2.  **Compile os Pacotes:** Compile todos os pacotes do workspace (`@viniciuscsouza/mcp-kit`, `@viniciuscsouza/create-mcp-kit`, etc.).
    ```bash
    npm run build --workspaces
    ```

3.  **Execute os Testes:** Antes de submeter suas alterações, certifique-se de que todos os testes estão passando.
    ```bash
    npm test --workspaces
    ```

## Testando o `@viniciuscsouza/create-mcp-kit` Localmente

Se suas alterações afetam o pacote `@viniciuscsouza/create-mcp-kit`, é crucial testá-lo localmente. O método recomendado é usar `npm link`.

1.  **Compile e Crie o Link Global:**
    ```bash
    # Na raiz do projeto, compile o pacote
    npm run build --workspace=@viniciuscsouza/create-mcp-kit
    
    # Navegue até o diretório do pacote e crie o link
    cd packages/create-mcp-kit
    npm link
    ```

2.  **Gere um Projeto de Teste:**
    Vá para um diretório **fora** do projeto (ex: `cd /tmp`) e rode o comando para gerar um projeto de teste.
    ```bash
    @viniciuscsouza/create-mcp-kit meu-projeto-de-teste
    ```

3.  **Resolva as Dependências Locais:**
    O projeto gerado depende do `@viniciuscsouza/mcp-kit`, que também é um pacote local. Você precisa linká-lo manualmente:
    ```bash
    # Primeiro, crie um link global para o @viniciuscsouza/mcp-kit (se ainda não o fez)
    cd /caminho/para/mcp/packages/mcp-kit
    npm link

    # Depois, vá para o seu projeto de teste recém-criado
    cd /tmp/meu-projeto-de-teste

    # E use o link para o @viniciuscsouza/mcp-kit
    npm link @viniciuscsouza/mcp-kit
    ```

4.  **Instale e Teste:**
    Agora, o `npm install` deve funcionar corretamente dentro de `meu-projeto-de-teste`.
    ```bash
    npm install
    npm test
    ```

5.  **Remova os Links (Opcional):**
    Após concluir os testes, você pode remover os links globais para manter seu ambiente limpo.
    ```bash
    # Dentro de packages/create-mcp-kit
    npm unlink

    # Dentro de packages/mcp-kit
    npm unlink @viniciuscsouza/mcp-kit
    ```

## Estilo de Código

Buscamos manter um estilo de código consistente. Por favor, tente seguir o estilo e as convenções que você encontrar no código existente. Usamos Prettier e ESLint para garantir a consistência (configuração a ser adicionada).

## Submetendo um Pull Request

-   Forneça um título claro e uma descrição detalhada para seu Pull Request.
-   Se seu PR corrige uma issue existente, referencie-a na descrição (ex: `Corrige #123`).
-   Certifique-se de que todos os testes continuam passando.
-   Mantenha seu Pull Request focado em uma única tarefa. Não misture correções de bugs com novas features no mesmo PR.

Obrigado pela sua contribuição!
