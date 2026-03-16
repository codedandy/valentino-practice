import { test, expect } from './fixtures/fixtures';

test('login with valid user', async ({ page, topBannerPage, loginPage }) => {
    await page.goto('');

    await topBannerPage.clickLogin();

    await loginPage.login('dandy@codedandy.com', 'Dandy12345');

    await page.waitForLoadState('networkidle');

    const experimentalButton = page.locator('[data-test-id="header-cart-button"]').locator('..').locator('div').first();
    const popup = page.getByText('Welcome!').locator('..').locator('..').locator('..');
    const welcome = page.locator('[data-radix-popper-content-wrapper]');
    // the following does not appear to work in the test window but does execute correctly
    const welcomePanel = welcome.locator('div').locator('div').filter({ hasText: 'Profile' });

    // const badButtonName = page.locator('div').filter({ hasText: /^Toggle navigation menu$/ }).locator('div').getByRole('button');

    await expect(experimentalButton).toBeVisible();
    await experimentalButton.click();
    await expect(popup).toContainText('dandy@codedandy.com');
    await welcomePanel.click();
})