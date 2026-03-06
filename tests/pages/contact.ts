import { Page, expect, Locator } from '@playwright/test';

export class ContactPage {
    readonly page: Page;
    readonly orderNumberInput: Locator;
    readonly emailInput: Locator;
    readonly trackOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderNumberInput = page.locator('[data-test-id="contact-order-id-input"]');
        this.emailInput = page.locator('[data-test-id="contact-email-input"]');
        this.trackOrderButton = page.getByRole('button', { name: 'Track Order' });
    }

    async submitTrackOrderForm(orderNumber: string, email: string) {
        await this.orderNumberInput.fill(orderNumber);
        await this.emailInput.fill(email);
        await this.trackOrderButton.click();
    }
}


// const trackOrderButton = await page.getByRole('button', { name: 'Track Order' });

// async function submitTrackorderForm(page: Page, orderNumber: string, email: string) { }