import test, { expect } from '@playwright/test';
import elements from '../pages/elements';
import { faker } from '@faker-js/faker';
import { getUser } from '../utils/data';

// test data
const siteUrl = 'https://student-portal.swaggear.life/login';
const username = 'testUser@gmail.com';
const testpass = 'SecurePasta123!';

test.describe('Student Management Portal Smoke Tests', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto(siteUrl);
      await page.locator(elements.email).fill(username);
      await page.locator(elements.pass).fill(testpass);
      await page.locator(elements.signIn).click();
   });

   test('verify user can login and see the home page', async ({ page }) => {
      expect(await page.locator(elements.banner).textContent()).toEqual('Existing Students');
      await expect(page.locator(elements.users).first()).toBeVisible();
   });

   test('verify user can search for a student', async ({ page }) => {
      await page.locator(elements.search).fill('Kara');
      await page.locator(elements.search).press('Enter');

      const all_users = page.locator(elements.users);
      expect(await all_users.count()).toBe(2);
      expect(await all_users.nth(0).textContent()).toContain('Kara Walker');
      expect(await all_users.nth(1).textContent()).toContain('Kara Dennis');
   });

   test.only('verify user can add new student', async ({ page }) => {
      const student = getUser();

      await page.locator(elements.addStudentBttn).click();
      await page.locator(elements.student.firstName).fill(student.firstName);
      await page.locator(elements.student.lastName).fill(student.lastName);
      await page.locator(elements.student.email).fill(student.email);
      await page.locator(elements.student.password).fill(student.password);
      await page.locator(elements.student.phoneNumber).fill(student.phoneNumber);
      await page.locator(elements.student.address).fill(student.address);
      await page.locator(elements.student.age).scrollIntoViewIfNeeded();
      await page.locator(elements.student.age).fill(String(student.age));
      await page.locator(elements.student.gender).fill(student.gender);
      page.locator(elements.createBttn).click();

      const fullName = `${student.firstName} ${student.lastName}`;
      await page.locator(elements.search).fill(fullName);
      await page.locator(elements.search).press('Enter');
      await page.waitForTimeout(2_000);
      // Assertion
      const actualName = await page.locator(elements.userInfo).first().textContent();
      expect(actualName).toEqual(fullName);
   });
});
