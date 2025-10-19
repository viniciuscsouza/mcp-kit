# Guia de Publicação de Pacotes NPM

Este guia detalha o processo recomendado para publicar pacotes NPM, garantindo que suas publicações sejam suaves e sem erros.

## Pré-requisitos

Antes de começar, certifique-se de que você está logado no NPM. Se não estiver, use o seguinte comando:

```bash
npm login
```

## Processo de Publicação

Siga estes passos para publicar seu pacote NPM:

### 1. Construir o Pacote

Certifique-se de que todas as suas alterações mais recentes foram compiladas e que os arquivos de distribuição estão prontos. Isso geralmente envolve a execução de um script de build definido no seu `package.json`.

```bash
npm run build
```

### 2. Verificar a Versão Atual

Verifique a versão atual do seu pacote no arquivo `package.json` para decidir como você irá incrementá-la.

```bash
cat package.json | grep version
```

### 3. Incrementar a Versão

Use o comando `npm version` para incrementar a versão do seu pacote. Escolha entre `patch`, `minor` ou `major` dependendo da natureza das suas alterações:

*   **`patch`**: Para pequenas correções de bugs (ex: `1.0.0` -> `1.0.1`)
*   **`minor`**: Para novas funcionalidades que são compatíveis com versões anteriores (ex: `1.0.0` -> `1.1.0`)
*   **`major`**: Para alterações que quebram a compatibilidade com versões anteriores (ex: `1.0.0` -> `2.0.0`)

Este comando também cria uma tag Git para a nova versão.

```bash
npm version patch   # ou minor, ou major
```

### 4. Executar Testes

É crucial executar todos os testes do seu pacote para garantir que as alterações não introduziram regressões e que tudo está funcionando conforme o esperado.

```bash
npm test
```

### 5. Publicar no NPM

Com o pacote construído, a versão incrementada e os testes aprovados, você pode publicar seu pacote no registro NPM. Use `--access public` se o seu pacote for público.

```bash
npm publish --access public
```

### 6. Corrigir Erros do `package.json` (Opcional, mas Recomendado)

Às vezes, o NPM pode auto-corrigir alguns erros no seu `package.json` durante a publicação. Para garantir que seu arquivo `package.json` esteja sempre consistente e livre de erros, execute `npm pkg fix` após a publicação ou sempre que houver um aviso.

```bash
npm pkg fix
```

Este comando ajuda a padronizar e limpar seu `package.json`, tornando-o mais robusto e compatível com as melhores práticas do NPM.
