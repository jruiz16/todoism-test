import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
  // No es necesario definir la URL si no se va a usar
  // private readonly url: string = 'http://127.0.0.1:5000/todo'; 

  constructor(page) {
    super(page);
  }

  async addTask(taskName: string): Promise<void> {
    await this.page.getByPlaceholder('What needs to be done?').click();
    await this.page.waitForTimeout(1000); // Espera 1 segundo para ver el paso
    await this.page.getByPlaceholder('What needs to be done?').fill(taskName);
    await this.page.waitForTimeout(1000); // Espera 1 segundo para ver el paso
    await this.page.getByPlaceholder('What needs to be done?').press('Enter');
  }

  async clearAllTasks(): Promise<void> {
    await this.page.getByText('clear_allClear').click();
    await this.page.waitForTimeout(1000); // Espera 1 segundo para ver el paso
  }

  async completeTask(taskName: string): Promise<void> {
    // Esperar a que el elemento esté visible antes de hacer clic
    const taskLocator = this.page.locator('span').filter({ hasText: `${taskName}` }).locator('i');
    await taskLocator.click(); // Hacer clic en el elemento
    await this.page.waitForTimeout(1000); // Espera 1 segundo para ver el paso
  }

  async logout(): Promise<void> { // Nueva función para cerrar sesión
    await this.page.locator('a').filter({ hasText: 'power_settings_new' }).click(); // Cerrar sesión
    await this.page.waitForTimeout(1000); // Espera 1 segundo para ver el paso
  }

  // Agrega más métodos según sea necesario para interactuar con la página de tareas
}
