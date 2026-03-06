import { test as base, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout';
import { ProductsPage } from '../pages/products';
import { TopBannerPage } from '../pages/topBanner';
import { CartPage } from '../pages/cart';
import { ContactPage } from '../pages/contact';
import { TrackingPage } from '../pages/tracking';

type Fixtures = {
    topBannerPage: TopBannerPage;
    checkoutPage: CheckoutPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    contactPage: ContactPage;
    trackingPage: TrackingPage;
};

const test = base.extend<Fixtures>({
    topBannerPage: async ({ page }, use) => {
        const topBanner = new TopBannerPage(page);
        await use(topBanner);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    contactPage: async ({ page }, use) => {
        const contactPage = new ContactPage(page);
        await use(contactPage);
    },
    trackingPage: async ({ page }, use) => {
        const trackingPage = new TrackingPage(page);
        await use(trackingPage);
    }
});

export { test, expect };