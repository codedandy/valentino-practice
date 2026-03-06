import { Page, expect, Locator } from '@playwright/test';

export class TrackingPage {
    readonly page: Page;
    readonly itemsOrderedDiv: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemsOrderedDiv = page.locator('div.space-y-4').locator('div.flex');
    }

    async assertUrl(orderNumber: string) {
        const relativePath = `/order/${orderNumber}`;
        await expect(this.page).toHaveURL(relativePath);
    }

    async assertItemsOrdered(itemPostion: number, productName: string, quantity: string) {
        const targetItemDiv = this.itemsOrderedDiv.nth(itemPostion);
        await expect(targetItemDiv).toContainText(productName);
        await expect(targetItemDiv).toContainText(`Qty: ${quantity}`);
    }
}