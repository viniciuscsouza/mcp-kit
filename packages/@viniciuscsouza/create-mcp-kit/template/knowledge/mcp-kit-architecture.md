# Visão Geral da Arquitetura do MCP-Kit

O MCP-Kit é um framework para TypeScript projetado para simplificar o desenvolvimento de servidores MCP. Ele se baseia em uma arquitetura modular e orientada a decoradores, promovendo a Inversão de Controle (IoC) e a clareza na organização do código.

## Componentes Principais

### `Application` (Classe Central)
A classe `Application` é o coração do MCP-Kit. Ela é responsável por:
- Gerenciar o ciclo de vida da aplicação.
- Registrar e inicializar `Providers`.
- Conectar-se a um transporte MCP (e.g., `StdioServerTransport`).
- Orquestrar a descoberta e execução de `Tools`, `Prompts` e `Resources` expostos pelos `Providers`.

### `Providers`
`Providers` são classes que agrupam funcionalidades relacionadas e as expõem ao sistema MCP. Eles são decorados com `@Provider` e contêm os `Tools`, `Prompts` e `Resources`.
- **Convenção:** Arquivos de provider devem seguir a nomenclatura `*.provider.ts`.
- **Namespace:** O `name` do `@Provider` funciona como um namespace automático para os IDs das capabilities (e.g., `hello/say` para uma tool `say` em um provider `hello`).

### Decoradores
O MCP-Kit utiliza decoradores para definir e configurar as capabilities de forma declarativa:
- **`@Provider`**: Marca uma classe como um provedor de funcionalidades MCP.
- **`@Tool`**: Marca um método dentro de um `Provider` como uma "ferramenta" que pode ser invocada por agentes de IA.
- **`@Prompt`**: Marca um método dentro de um `Provider` como um "prompt" que pode ser usado para gerar instruções para agentes de IA.
- **`@Resource`**: (Implícito através de métodos `listResources` e `readResource`) Define "recursos" que fornecem dados contextuais.

## Fluxo de Execução

1.  A classe `Application` é instanciada.
2.  `Providers` são registrados na `Application`.
3.  A `Application` se conecta a um transporte MCP.
4.  Através do transporte, a `Application` se comunica com clientes MCP, expondo as `Tools`, `Prompts` e `Resources` definidos nos `Providers`.
5.  Quando um cliente invoca uma capability (e.g., uma `Tool`), a `Application` roteia a chamada para o método correspondente no `Provider` apropriado.

## Inversão de Controle (IoC)
O MCP-Kit adota IoC, onde a `Application` gerencia a criação e o ciclo de vida dos `Providers`. Isso desacopla os componentes e facilita a testabilidade e a manutenção.
