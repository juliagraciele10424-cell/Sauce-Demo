import { test, expect } from '../fixtures/pages.fixture';

test('dado que estou na página base quando uso as credenciais de acesso então consigo acessar a página com sucesso', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.expectLoaded();
  await loginPage.loginWith({ username: 'problem_user', password: 'secret_sauce' });
  await loginPage.expectLoggedIn();

  await expect(loginPage.page.getByText('Products')).toBeVisible();
});

test('dado que estou na página /inventory.html quando clico no burguer button no lado superior esquerdo então se abre um menu da lateral esquerda', async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.loginWith({ username: 'problem_user', password: 'secret_sauce' });
  await loginPage.expectLoggedIn();

  await inventoryPage.expectLoaded();
  await inventoryPage.openMenu();
  await inventoryPage.expectMenuOpen();
});

test('dado que estou na página /inventory.html quando clico em logout no menu lateral então retorno para a página de login', async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.loginWith({ username: 'problem_user', password: 'secret_sauce' });
  await loginPage.expectLoggedIn();

  await inventoryPage.expectLoaded();
  await inventoryPage.logout();
  await inventoryPage.expectLoggedOut();
});

test('dado que o menu lateral esta aberto quando clico em Dynamic Catalog entao se abre um submenu com tres opcoes de links na horizontal', async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.loginWith({ username: 'problem_user', password: 'secret_sauce' });
  await loginPage.expectLoggedIn();

  await inventoryPage.expectLoaded();
  await inventoryPage.openMenu();
  await inventoryPage.expectMenuOpen();
  await inventoryPage.openDynamicCatalog();
  await inventoryPage.expectDynamicCatalogSubmenuOpen();
});
