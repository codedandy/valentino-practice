import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly subtotalWrapper: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subtotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
        this.checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
    }

    async assertProduct(page: Page, heading: string) {
        const targetProduct = page.getByRole('heading', { name: heading });
        expect(targetProduct).toBeVisible();
    }

    async assertProductQuantity(page: Page, heading: string, quantity: string) {
        const targetProductQuantity = await page.getByRole('heading', { name: heading }).locator('..').locator('..').locator('div.flex');
        await expect(targetProductQuantity).toContainText(quantity);
    }

    async getSubtotal(page: Page) {
        const subtotalText = await this.subtotalWrapper.textContent();

        return await Number(subtotalText?.substring(1));
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

async function assertProduct(page: Page, heading: string) {
    const targetProduct = page.getByRole('heading', { name: heading });
    await expect(targetProduct).toBeVisible();
}

async function assertProductQuantity(page: Page, heading: string, quantity: string) {
    const targetProductQuantity = await page.getByRole('heading', { name: heading }).locator('..').locator('..').locator('div.flex');
    await expect(targetProductQuantity).toContainText(quantity);
}

async function getSubtotal(page: Page) {
    const subtotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subtotalText = await subtotalWrapper.textContent();

    return await Number(subtotalText?.substring(1));
}

async function proceedToCheckout(page: Page) {
    const checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
    await checkoutButton.click();
}

export {
    assertProduct,
    assertProductQuantity,
    getSubtotal,
    proceedToCheckout
};