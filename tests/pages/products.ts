import { Page, expect, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productWrapper: Locator

    constructor(page: Page) {
        this.page = page;
        this.productWrapper = page.locator('.p-6');
    }

    async addProductsToCart(index: number, quantity: number) {
        const targetProductWrapper = this.productWrapper.nth(index);
        const targetProductName = await targetProductWrapper.getByRole('heading').first().textContent();
        const targetProductPrice = await targetProductWrapper.locator('.font-bold').textContent();
        const addProductButton = targetProductWrapper.getByRole('button', { name: 'Add to Cart' });

        await addProductButton.click({ clickCount: quantity });

        return {
            name: targetProductName,
            price: Number(targetProductPrice?.substring(1)),
            quantity: String(quantity)
        };
    }
}

async function addProducttoCart(page: Page, index: number) {
    const targetProductWrapper = page.locator('.p-6').nth(index);
    const targetProductName = await targetProductWrapper.getByRole('heading').first().textContent();
    const targetProductPrice = await targetProductWrapper.locator('.font-bold').textContent();
    const addProductButton = targetProductWrapper.getByRole('button', { name: 'Add to Cart' });

    await addProductButton.click();

    return {
        name: targetProductName,
        price: Number(targetProductPrice?.substring(1))
    };
};

async function addProductsToCart(page: Page, index: number, quantity: number) {
    const targetProductWrapper = page.locator('.p-6').nth(index);
    const targetProductName = await targetProductWrapper.getByRole('heading').first().textContent();
    const targetProductPrice = await targetProductWrapper.locator('.font-bold').textContent();
    const addProductButton = targetProductWrapper.getByRole('button', { name: 'Add to Cart' });

    await addProductButton.click({ clickCount: quantity });

    return {
        name: targetProductName,
        price: Number(targetProductPrice?.substring(1)),
        quantity: String(quantity)
    };
};

export {
    addProducttoCart,
    addProductsToCart
};