import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { TodoPage } from '../pages/TodoPage'; // Asegúrate de importar TodoPage

let context;
let page;

async function agregarTarea(page, tarea) {
    
}

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(); // Crear un contexto una vez
});

test.beforeEach(async () => {
    test.slow();
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
    const textTarea = 'Tarea de Test'; // Asignar el valor aquí
    const todoPage = new TodoPage(page); // Usar const aquí es seguro
    await todoPage.addTask(textTarea);
    await expect(page.getByText(textTarea)).toBeVisible();
});

test('Completar tarea', async () => {
    const textTarea = 'Tarea de Test'; // Asignar el mismo valor
    const todoPage = new TodoPage(page); // Nueva instancia
    await todoPage.addTask(textTarea);
    await todoPage.completeTask(textTarea);

    const taskLocator = page.locator('span:not(.item-body)').filter({ hasText: textTarea });
    await expect(taskLocator).toHaveClass('inactive-item');
});

test('Limpiar todas las tareas', async () => {
    await page.waitForTimeout(1000);
    const textTarea = 'Tarea de Test'; // Asignar el mismo valor
    const todoPage = new TodoPage(page); // Nueva instancia
    await todoPage.addTask(textTarea);
    await todoPage.completeTask(textTarea);
    await todoPage.clearAllTasks();

    const inactiveTasks = page.locator('.inactive-item');
    await expect(inactiveTasks).toHaveCount(0);

    await todoPage.logout();
});
