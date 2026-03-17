import { Page, Locator } from '@playwright/test';

export class TopBannerPage {
    readonly page: Page;
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly shopLink: Locator;
    readonly contactLink: Locator;
    readonly loginLink: Locator;
    readonly signUpLink: Locator;
    readonly cartButton: Locator;
    readonly userLink: Locator;
    readonly userPopup: Locator;
    readonly userProfileLink: Locator;
    readonly userOrdersLink: Locator;
    readonly userLogoutButton: Locator;
    readonly userWelcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('link', { name: 'V Valentino\'s Magic Beans' });
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.shopLink = page.getByRole('link', { name: 'Shop' });
        this.contactLink = page.getByRole('link', { name: 'Contact' });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
        this.cartButton = page.locator('[data-test-id="header-cart-button"]').getByRole('button');
        this.userLink = page.locator('[data-test-id="header-cart-button"]').locator('..').locator('div').first();
        this.userPopup = page.locator('[data-radix-popper-content-wrapper]');
        this.userProfileLink = this.userPopup.locator('div').locator('div').filter({ hasText: 'Profile' });
        this.userOrdersLink = this.userPopup.locator('div').locator('div').filter({ hasText: 'My Orders' });
        this.userLogoutButton = this.userPopup.locator('div').locator('div').filter({ hasText: 'Log out' });
        // this.userWelcomeMessage = page.getByText('Login Successful');
        this.userWelcomeMessage = page.locator('div').getByText('Login Successful');

    }

    async clickLogo() {
        await this.logo.click();
    }

    async clickHome() {
        await this.homeLink.click();
    }

    async clickShop() {
        await this.shopLink.click();
    }

    async clickContact() {
        await this.contactLink.click();
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickSignUp() {
        await this.signUpLink.click();
    }

    async goToCart() {
        await this.cartButton.click();
    }
}

async function clickBannerLogo(page: Page) {
    const bannerLogo = page.getByRole('link', { name: 'V Valentino\'s Magic Beans' });
    await bannerLogo.click();
}

async function clickBannerHome(page: Page) {
    const bannerHome = page.getByRole('link', { name: 'Home' });
    await bannerHome.click();
}

async function clickBannerShop(page: Page) {
    const bannerShop = page.getByRole('link', { name: 'Shop' });
    await bannerShop.click();
}

async function clickBannerContact(page: Page) {
    const bannerContact = page.getByRole('link', { name: 'Contact' });
    await bannerContact.click();
}

async function clickBannerLogin(page: Page) {
    const bannerLogin = page.getByRole('link', { name: 'Login' });
    await bannerLogin.click();
}

async function clickBannerSignUp(page: Page) {
    const bannerSignUp = page.getByRole('link', { name: 'Sign Up' });
    await bannerSignUp.click();
}

async function goToCart(page: Page) {
    const cartButton = page.locator('[data-test-id="header-cart-button"]').getByRole('button');
    await cartButton.click();
}

export {
    clickBannerLogo,
    clickBannerHome,
    clickBannerShop,
    clickBannerContact,
    clickBannerLogin,
    clickBannerSignUp,
    goToCart
};