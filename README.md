# Sauce Demo - Testes E2E

Repositorio de testes automatizados end-to-end para o site [Sauce Demo](https://www.saucedemo.com/), usando Playwright com TypeScript.

O projeto valida fluxos principais da aplicacao, como login, acesso ao inventario, abertura do menu lateral e logout.

## Tecnologias

- Node.js
- TypeScript
- Playwright
- @playwright/test

## Estrutura do Projeto

```text
tests/
  fixtures/
    auth.fixture.ts
    pages.fixture.ts
  pages/
    base.page.ts
    inventory.page.ts
    login.page.ts
  specs/
    login.spec.ts
```

### `tests/specs`

Contem os cenarios de teste. Os specs devem ser curtos, legiveis e focados no comportamento esperado.

### `tests/pages`

Contem os Page Objects, responsaveis por centralizar navegacao, locators e assercoes especificas de cada pagina.

### `tests/fixtures`

Contem fixtures customizadas para disponibilizar Page Objects e dados reutilizaveis nos testes.

## Pre-requisitos

- Node.js instalado
- npm instalado

## Instalacao

Instale as dependencias do projeto:

```bash
npm install
```

Instale os browsers usados pelo Playwright, se ainda nao estiverem instalados:

```bash
npx playwright install
```

## Como Rodar os Testes

Rodar todos os testes em modo headless:

```bash
npm run test:e2e
```

Rodar os testes com navegador visivel:

```bash
npm run test:e2e:headed
```

Abrir a interface interativa do Playwright:

```bash
npm run test:e2e:ui
```

Abrir o relatorio HTML:

```bash
npm run report
```

## Cenarios Automatizados

Atualmente, os testes cobrem:

- Login com credenciais validas
- Validacao da pagina de inventario
- Abertura do menu lateral na pagina de inventario
- Logout pelo menu lateral

## Credenciais

As credenciais usadas nos testes estao centralizadas em `tests/fixtures/auth.fixture.ts`:

```ts
username: 'problem_user'
password: 'secret_sauce'
```

## Padrao Para Novos Testes

Ao adicionar um novo fluxo:

1. Crie ou atualize um Page Object em `tests/pages`.
2. Registre o Page Object em `tests/fixtures/pages.fixture.ts`, quando necessario.
3. Crie o spec em `tests/specs`.
4. Escreva o nome do teste em portugues, descrevendo o comportamento esperado.
5. Rode `npm run test:e2e`.
6. Atualize este README quando adicionar um fluxo importante.

## Boas Praticas

- Prefira seletores semanticos, como `getByRole`, `getByLabel`, `getByText` e `getByPlaceholder`.
- Evite repetir seletores diretamente nos specs.
- Encapsule acoes e validacoes nos Page Objects.
- Mantenha os specs focados em comportamento, sem detalhes de implementacao.
- Use fixtures para compartilhar Page Objects e dados comuns.
