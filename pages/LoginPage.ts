import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{

    readonly page: Page;
    readonly getATestAccountButton: Locator;
    readonly loginButton: Locator;
    readonly userNameInput: Locator;

    readonly GER_AT_TEXT_ACCOUNT_TEXT_SELECTOR = 'Get a test account';
    readonly LOGIN_BUTTON_ID_SELECTOR = '#login-btn';
    readonly USERNAME_BUTTON_ID_SELECTOR = '#username-input';

    constructor(page){
        this.page = page;
        this.getATestAccountButton = page.getByText(this.GER_AT_TEXT_ACCOUNT_TEXT_SELECTOR);
        this.loginButton = page.locator(this.LOGIN_BUTTON_ID_SELECTOR);
        this.userNameInput = page.locator(this.USERNAME_BUTTON_ID_SELECTOR);
    }

    clickGetATestAccount = async () => {
        await this.getATestAccountButton.click();        
        await expect(this.userNameInput).not.toBeEmpty();
    }

    clickLoginButton = async () => {
        await this.loginButton.click();
    }

}