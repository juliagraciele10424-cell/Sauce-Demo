# Instrucoes Para Evoluir Os Testes

Este projeto usa Playwright com TypeScript para automatizar cenarios do site `https://www.saucedemo.com/`.

Ao criar ou alterar testes, siga este padrao.

## Arquitetura

- Mantenha os cenarios em `tests/specs`.
- Mantenha Page Objects em `tests/pages`.
- Mantenha componentes reutilizaveis em `tests/components`.
- Mantenha fixtures customizadas em `tests/fixtures`.
- Use `playwright.config.ts` para configuracoes globais, como `baseURL`, reporter, traces, screenshots e projetos de browser.

## Page Objects

- Crie um Page Object por pagina ou fluxo principal.
- Page Objects devem encapsular navegacao, locators e assercoes especificas da pagina.
- Testes nao devem repetir seletores diretamente quando eles ja pertencem a uma Page Object ou componente.
- Use nomes de metodos que expressem comportamento do usuario ou expectativa da pagina, por exemplo:
  - `open()`
  - `expectLoaded()`
  - `expectKnownHeadingVariation()`
  - `expectSplitTestingDescription()`
- Reaproveite `BasePage` para comportamento comum entre paginas.

## Componentes Reutilizaveis

- Crie componentes para partes da interface que aparecem em varias paginas, como cabecalho, rodape, menu, mensagens ou blocos de conteudo.
- Componentes devem concentrar locators e validacoes comuns.
- Evite duplicar seletores comuns em varios Page Objects.

## Fixtures

- Registre Page Objects em fixtures dentro de `tests/fixtures`.
- Importe `test` e `expect` a partir da fixture customizada nos specs.
- Prefira receber Page Objects prontos no teste, por exemplo:

```ts
test('deve validar a pagina', async ({ abTestingPage }) => {
  await abTestingPage.open();
  await abTestingPage.expectLoaded();
});
```

## Specs

- Specs devem ser curtos, legiveis e focados no comportamento testado.
- Evite colocar regras de negocio, seletores ou detalhes de implementacao diretamente no spec.
- Use `test.describe` para agrupar cenarios da mesma funcionalidade.
- Escreva nomes de testes em portugues, claros e orientados ao comportamento esperado.

## Seletores E Assercoes

- Prefira seletores resilientes e legiveis.
- Use `getByRole`, `getByLabel`, `getByText` e locators semanticos quando a pagina permitir.
- Quando a pagina nao tiver boa semantica, use seletores CSS simples e encapsulados no Page Object ou componente.
- Evite assercoes muito frageis em textos dinamicos. Para conteudos variaveis, use regex ou valide partes relevantes da mensagem.
- Para A/B tests, aceite variacoes conhecidas e valide o comportamento essencial.

## Padrao Para Novas Paginas Do The Internet

Ao automatizar uma nova pagina:

1. Crie ou atualize um Page Object em `tests/pages`.
2. Extraia partes compartilhadas para `tests/components` quando fizer sentido.
3. Registre a nova Page Object em `tests/fixtures/pages.fixture.ts`.
4. Crie o spec em `tests/specs`.
5. Rode `npm run test:e2e`.
6. Atualize o `README.md` quando adicionar um novo fluxo importante.

## Comandos

```bash
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:ui
npm run report
```
