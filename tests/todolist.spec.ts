import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { TodoPage } from '../pages/TodoPage'; // Asegúrate de importar TodoPage

let context; // Declarar el contexto fuera de los hooks
let page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(); // Crear un contexto una vez
});

test.beforeEach(async () => {
    page = await context.newPage(); // Crear una nueva página para cada prueba
    const homePage = new LoginPage(page);
    await homePage.login();
});

test.afterEach(async () => {
    await page.close(); // Cerrar la página después de cada prueba
});

test.afterAll(async () => {
    await context.close(); // Cerrar el contexto al final de todas las pruebas
});

test('Agregar y verificar tarea', async () => {
    const todoPage = new TodoPage(page);
    await todoPage.addTask('Tarea de Test');
    await expect(page.getByText('Tarea de Test')).toBeVisible();
});

test('Completar tarea', async () => {
    const todoPage = new TodoPage(page);
    await todoPage.completeTask('Tarea de Test');

    const taskLocator = page.locator('span:not(.item-body)').filter({ hasText: 'Tarea de Test' });
    await expect(taskLocator).toHaveClass('inactive-item');
});

test('Limpiar todas las tareas', async () => {
    await page.waitForTimeout(1000);
    const todoPage = new TodoPage(page);
    await todoPage.clearAllTasks();

    const inactiveTasks = page.locator('.inactive-item');
    await expect(inactiveTasks).toHaveCount(0);

    await todoPage.logout();
});
