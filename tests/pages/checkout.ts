import { Page, expect, Locator } from '@playwright/test';
import { UserInfo } from '../test-data/product-checkout';

export class CheckoutPage {
    readonly page: Page;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly email: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly cardname: Locator;
    readonly cardnumber: Locator;
    readonly cardexpiry: Locator;
    readonly cardcvc: Locator;
    readonly placeOrderButton: Locator;
    readonly orderNumber: Locator;
    readonly trackOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstname = page.locator('[data-test-id="checkout-firstname-input"]');
        this.lastname = page.locator('[data-test-id="checkout-lastname-input"]');
        this.email = page.locator('[data-test-id="checkout-email-input"]');
        this.address = page.locator('[data-test-id="checkout-address-input"]');
        this.city = page.locator('[data-test-id="checkout-city-input"]');
        this.zipcode = page.locator('[data-test-id="checkout-zipcode-input"]');
        this.cardname = page.locator('[data-test-id="checkout-cardname-input"]');
        this.cardnumber = page.locator('[data-test-id="checkout-cardnumber-input"]');
        this.cardexpiry = page.locator('[data-test-id="checkout-cardexpiry-input"]');
        this.cardcvc = page.locator('[data-test-id="checkout-cardcvc-input"]');
        this.placeOrderButton = page.locator('[data-test-id="place-order-button"]');
        this.orderNumber = page.getByText('Your Order ID is:').locator('..').locator('p.text-2xl');
        this.trackOrderButton = page.getByRole('button', { name: 'Track Your Order' });
    }

    async fillUserInfo(user: UserInfo) {
        await this.firstname.fill(user.fName!);
        await this.lastname.fill(user.lName!);
        await this.email.fill(user.emailAddy!);
        await this.address.fill(user.address1!);
        await this.city.fill(user.city!);
        await this.zipcode.fill(user.zipcode!);
        await this.cardname.fill(`${user.fName} ${user.lName}`);
        await this.cardnumber.fill(user.cardNumber!);
        await this.cardexpiry.fill(user.cardExpiration!);
        await this.cardcvc.fill(user.cardSvc!);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }

    async grabOrderNumber() {
        return this.orderNumber.textContent();
    }

    async clickTrackOrder() {
        await this.trackOrderButton.click();
    }
}


// const trackOrderButton = page.getByRole('button', { name: 'Track Your Order' });

// const checkoutFormData = {
//     firstname: '[data-test-id="checkout-firstname-input"]',
//     lastname: '[data-test-id="checkout-lastname-input"]',
//     email: '[data-test-id="checkout-email-input"]',
//     address: '[data-test-id="checkout-address-input"]',
//     city: '[data-test-id="checkout-city-input"]',
//     zipcode: '[data-test-id="checkout-zipcode-input"]',
//     cardname: '[data-test-id="checkout-cardname-input"]',
//     cardnumber: '[data-test-id="checkout-cardnumber-input"]',
//     cardexpiry: '[data-test-id="checkout-cardexpiry-input"]',
//     cardcvc: '[data-test-id="checkout-cardcvc-input"]'
// }

// async function fillUserInfo(page: Page, user: UserInfo) {
//     await page.locator(checkoutFormData.firstname).fill(user.fName!);
//     await page.locator(checkoutFormData.lastname).fill(user.lName!);
//     await page.locator(checkoutFormData.email).fill(user.emailAddy!);
//     await page.locator(checkoutFormData.address).fill(user.address1!);
//     await page.locator(checkoutFormData.city).fill(user.city!);
//     await page.locator(checkoutFormData.zipcode).fill(user.zipcode!);
//     await page.locator(checkoutFormData.cardname).fill(`${user.fName} ${user.lName}`);
//     await page.locator(checkoutFormData.cardnumber).fill(user.cardNumber!);
//     await page.locator(checkoutFormData.cardexpiry).fill(user.cardExpiration!);
//     await page.locator(checkoutFormData.cardcvc).fill(user.cardSvc!);
// }

// async function clickPlaceOrder(page: Page) {
//     await page.locator('[data-test-id="place-order-button"]').click();
// }

// async function grabOrderNumber(page: Page) {
//     const spiderHops = await page.getByText('Your Order ID is:').locator('..').locator('p.text-2xl');
//     // console.log('Order Number:', orderNumber);

//     return spiderHops.textContent();
// }



// export {
//     fillUserInfo,
//     clickPlaceOrder,
//     grabOrderNumber,
// };