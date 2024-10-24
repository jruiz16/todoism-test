import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly url: string = 'http://127.0.0.1:5000/';

  constructor(page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async navigateToLogin(): Promise<void> {
    await this.page.getByRole('navigation').getByRole('link', { name: 'Login' }).click();
  }

  async getUserTest(): Promise<void> {
    await this.page.getByText('Get a test account').click();
    await this.page.waitForFunction(() => {
      const input = document.getElementById('username-input') as HTMLInputElement; // Se especifica el tipo
      return input !== null && input.value !== '';
    });
  }

  async loginIntoPage(): Promise<void> {
    await this.page.getByText('Login').click();
  }


  async login(): Promise<void> {
    await this.navigate();
    await this.navigateToLogin();
    await this.getUserTest();
    await this.page.locator('#login-btn').click();
  }
}
