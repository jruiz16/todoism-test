import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly loginButton: Locator;

    private readonly TODOISM_URL = 'http://127.0.0.1:5000/';

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('navigation').getByRole('link', { name: 'Login' })
    }

    openPage = async () => {
        await this.page.goto(this.TODOISM_URL);
    }

    clickLoginButton = async () => {
        await this.loginButton.click();
    }

}   