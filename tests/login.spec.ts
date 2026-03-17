import { test, expect } from './fixtures/fixtures';
// import * as loginData from '../playwright/.auth/login.json'

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('login with valid user - run through user menu', async ({ page, topBannerPage, loginPage }) => {

    await test.step('Login with from top banner', async () => {
        await topBannerPage.clickLogin();
        await loginPage.login(process.env.VALID_USER!, process.env.VALID_PASSWORD!);

        await page.waitForLoadState('networkidle');

        await expect(topBannerPage.userWelcomeMessage).toBeVisible();
    });

    await test.step('navigate to profile page', async () => {
        await topBannerPage.userLink.click();
        await expect(topBannerPage.userPopup).toContainText(process.env.VALID_USER!);
        await topBannerPage.userProfileLink.click();
        await expect(page.getByRole('heading', { name: 'User Details' })).toBeVisible();
    });

    await test.step('navigate to orders page', async () => {
        await topBannerPage.userLink.click();
        await topBannerPage.userOrdersLink.click();
        await expect(page.getByRole('heading', { name: 'My Orders' })).toBeVisible();
    });

    await test.step('logout', async () => {
        await topBannerPage.userLink.click();
        await topBannerPage.userLogoutButton.click();
        await expect(topBannerPage.loginLink).toBeVisible();
    });

})