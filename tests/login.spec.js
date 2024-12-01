import { test, expect } from '@playwright/test';

test('Verify user can login to the app', async ({ page }) => {
   await page.goto('https://student-portal.swaggear.life/login');
   await page.getByLabel('Username / Email *').click();
   await page.getByLabel('Username / Email *').fill('test@gmail.com');
   await page.getByLabel('Password *').click();
   await page.getByLabel('Password *').fill('test1');
   await page.getByRole('button', { name: 'Sign In' }).click();
   await expect(page.locator('#students-title')).toContainText('Existing Students');
});
