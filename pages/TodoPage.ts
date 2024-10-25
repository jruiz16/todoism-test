import { Locator, Page } from "@playwright/test";


export class TodoAppPage {

    readonly page: Page;
    readonly taskInput: Locator;
    readonly clearTaskListButton: Locator;

    private readonly TASK_INPUT_PLACEHOLDER_SELECTOR = 'What needs to be done?';
    private readonly CLEAR_TASK_LIST_BUTTON_SELECTOR = 'clear_allClear';

    constructor(page) {
        this.page = page;
        this.taskInput = page.getByPlaceholder(this.TASK_INPUT_PLACEHOLDER_SELECTOR);
        this.clearTaskListButton = page.getByText(this.CLEAR_TASK_LIST_BUTTON_SELECTOR);
    }

    async addTaskToList(task: string): Promise<void> {
        await this.addTask(task);
    }

    async markTaskAsCompleted(taskText: string): Promise<void> {
        const CREATED_TASK_FILTER_SELECTOR = `check_box_outline_blank ${taskText}`;
        const createdTaskCheckbox: Locator = this.page.locator('span').filter({ hasText: CREATED_TASK_FILTER_SELECTOR }).locator('i')
        await createdTaskCheckbox.click();
    }

    async clearTaskList(): Promise<void> {
        await this.clearTaskListButton.click();
    }

    async getIfTaskIsCompleted(taskText: string): Promise<boolean> {
        const COMPLETED_TASK_SELECTOR = this.getCompletedTaskSelector(taskText);
        await this.page.waitForSelector(COMPLETED_TASK_SELECTOR);
        const completedTaskCheckbox: Locator = this.page.locator(COMPLETED_TASK_SELECTOR);
        return await completedTaskCheckbox.isVisible();
    }

    async getIfTaskIsRemoved(): Promise<boolean> {
        const COMPLETED_TASK_SELECTOR = this.getCompletedTaskSelector();
        await this.page.waitForSelector(COMPLETED_TASK_SELECTOR, { state: 'detached' });
        const elementExistsCount = await this.page.locator(COMPLETED_TASK_SELECTOR).count();
        return !elementExistsCount;
    }

    async getGeneratedTaskText(taskText: string): Promise<string> {
        const CREATED_TASK_SELECTOR = `//span[@class = "active-item" and contains(., "${taskText}")]`;
        const createdTask: Locator = this.page.locator(CREATED_TASK_SELECTOR);
        return await createdTask.textContent() || '';
    }

    private async addTask(task: string): Promise<void> {
        await this.taskInput.click();
        await this.taskInput.fill(task);
        await this.taskInput.press('Enter');
    }

    private getCompletedTaskSelector(taskText?: string): string {
        if (taskText) {
            return `//span[@class = "inactive-item" and contains(., "${taskText}")]`;
        }
        return `//span[@class = "inactive-item"]`;
    }

}