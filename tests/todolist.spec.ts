import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { TodoAppPage } from '../pages/TodoPage';

test.describe('Todoism test suit cases', () => {
    
    test.beforeEach(async ({ page }) => {
        test.slow();
        const homePage: HomePage = new HomePage(page);
        const loginPage: LoginPage = new LoginPage(page);

        await homePage.openPage();
        await homePage.clickLoginButton();
        await loginPage.clickGetATestAccount();
        await loginPage.clickLoginButton();
    });

    test('Create a new task', async ({ page }) => {
        test.slow();
        const tastText = 'Tarea de Tets';
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList(tastText);
        const taskText = await toDoAppPage.getGeneratedTaskText(tastText);        
        expect(taskText).toBe(tastText);
    });
    
    test('Create a task and mark as completed', async ({ page }) => {
        test.slow();
        const tastText = 'Tarea de Tets';
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList(tastText);
        await toDoAppPage.markTaskAsCompleted(tastText);
        const isTaskCompleted = await toDoAppPage.getIfTaskIsCompleted(tastText);
        expect(isTaskCompleted).toBeTruthy();
    });
    
    test('Clear task list', async ({ page }) => {
        test.slow();
        const tastText = 'Tarea de Tets';
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList(tastText);
        await toDoAppPage.markTaskAsCompleted(tastText);
        await toDoAppPage.clearTaskList();
        const isTaskRemoved = await toDoAppPage.getIfTaskIsRemoved();
        expect(isTaskRemoved).toBeTruthy(); 
    });

});