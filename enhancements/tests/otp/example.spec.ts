// import { test, expect } from '@playwright/test';
import { test, expect } from '../../utils/fixtures/helpers';

test.use({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 720 },
 });

// Intercept network requests to block unnecessary resources
// test.beforeEach(async ({ page }) => {
//   await page.route('**/*', (route) => {
//     const request = route.request();
//     const resourceType = request.resourceType();

//     // Block images, stylesheets, fonts, and media to reduce load
//     if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
//       route.abort();
//     } else {
//       route.continue();
//     }
//   });
// });

// test('typical failed test (wait until finished)', async ({ page }) => {
//   await page.goto('https://playwright.dev/', {waitUntil: 'domcontentloaded'});
//   const link = await page.getByRole('link', { name: 'Get started test' }).click();
// });

test('smart test 1', async ({ getByRole, visit, click, page }) => {
  await visit('https://autodesk.com/', {waitUntil: 'domcontentloaded'});
  await click(await getByRole('link', { name: 'Get started test' }));
});

test('smart test 2', async ({ getByRole, visit, click, page }) => {
  await visit('https://playwright.dev/', {waitUntil: 'domcontentloaded'});
  await click(await getByRole('link', { name: 'Get started test' }));
});







// test('this test will fail', async ({ page }) => {

//   // Navigate to the website
//   const res = await page.goto('https://www.autodesk.com/', { waitUntil: 'domcontentloaded' });
//   isValidRes(res);

//   // Log the HTML content of the page
//   const content = await page.content();
//   console.log('Autodesk Page HTML:', content);

//   // Click the "Get started" link (assuming it exists on the page)
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expect the page to have a heading with the name "Installation"
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
