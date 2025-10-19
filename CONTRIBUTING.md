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

2.  **Compile os Pacotes:** Compile todos os pacotes do workspace (`mcp-kit`, `create-mcp-kit`, etc.).
    ```bash
    npm run build --workspaces
    ```

3.  **Execute os Testes:** Antes de submeter suas alterações, certifique-se de que todos os testes estão passando.
    ```bash
    npm test --workspaces
    ```

## Estilo de Código

Buscamos manter um estilo de código consistente. Por favor, tente seguir o estilo e as convenções que você encontrar no código existente. Usamos Prettier e ESLint para garantir a consistência (configuração a ser adicionada).

## Submetendo um Pull Request

-   Forneça um título claro e uma descrição detalhada para seu Pull Request.
-   Se seu PR corrige uma issue existente, referencie-a na descrição (ex: `Corrige #123`).
-   Certifique-se de que todos os testes continuam passando.
-   Mantenha seu Pull Request focado em uma única tarefa. Não misture correções de bugs com novas features no mesmo PR.

Obrigado pela sua contribuição!
