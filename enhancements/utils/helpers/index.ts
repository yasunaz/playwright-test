// helpers.ts

import { Locator, Page } from '@playwright/test';
import { isValidRes } from '../response';

/**
 * Navigates to a specified URL and validates the response.
 *
 * @param page - The Playwright Page object.
 * @param url - The URL to navigate to.
 * @returns The response received from navigating to the URL.
 */
export async function visit(page: Page, url: string) {
    const res = await page.goto(url);
    isValidRes(res);
    return res;
}

/**
 * Clicks on a locator if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to click.
 * @param errorMessage - Custom error message if the locator does not exist.
 */
export async function click(locator: Locator, errorMessage: string = 'Click failed: element does not exist.') {
  const exists = await locator.count() > 0;
  if (!exists) {
    throw new Error(errorMessage);
  }
  return await locator.click();
}

/**
 * Double-clicks on a locator if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to double-click.
 * @param errorMessage - Custom error message if the locator does not exist.
 */
export async function doubleClick(locator: Locator, errorMessage: string = 'Double-click failed: Element does not exist.') {
    const exists = await locator.count() > 0;
    if (!exists) {
      throw new Error(errorMessage);
    }
    return await locator.dblclick();
  }

/**
 * Fills a locator with a specified value if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to fill.
 * @param value - The value to fill into the locator.
 * @param errorMessage - Custom error message if the locator does not exist.
 */
export async function fill(locator: Locator, value: string, errorMessage: string = 'Fill failed: Element does not exist.') {
  const exists = await locator.count() > 0;
  if (!exists) {
    throw new Error(errorMessage);
  }
  return await locator.fill(value);
}

/**
 * Hovers over a locator if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to hover.
 * @param errorMessage - Custom error message if the locator does not exist.
 */
export async function hover(locator: Locator, errorMessage: string = 'Hover failed: Element does not exist.') {
  const exists = await locator.count() > 0;
  if (!exists) {
    throw new Error(errorMessage);
  }
  return await locator.hover();
}

/**
 * Checks a locator (e.g., checkbox or radio button) if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to check.
 * @param errorMessage - Custom error message if the locator does not exist.
 */
export async function check(locator: Locator, errorMessage: string = 'Check failed: Element does not exist.') {
    const exists = await locator.count() > 0;
    if (!exists) {
      throw new Error(errorMessage);
    }
    return await locator.check();
  }

  /**
 * Selects an option in a dropdown locator if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator representing the select element.
 * @param value - The value of the option to select.
 * @param errorMessage - Custom error message if the locator does not exist.
 */
export async function selectOption(locator: Locator, value: string, errorMessage: string = 'Select option failed: Element does not exist.') {
    const exists = await locator.count() > 0;
    if (!exists) {
      throw new Error(errorMessage);
    }
    return await locator.selectOption(value);
  }

  /**
 * Types text into a locator if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to type into.
 * @param text - The text to type.
 * @param errorMessage - Custom error message if the locator does not exist.
 */
export async function typeText(locator: Locator, text: string, errorMessage: string = 'Type failed: Element does not exist.') {
    const exists = await locator.count() > 0;
    if (!exists) {
      throw new Error(errorMessage);
    }
    return await locator.type(text);
  }

  /**
 * Retrieves the text content of a locator if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to retrieve text from.
 * @param errorMessage - Custom error message if the locator does not exist.
 * @returns The text content of the locator.
 */
export async function getText(locator: Locator, errorMessage: string = 'Get text failed: Element does not exist.') : Promise<string> {
    const exists = await locator.count() > 0;
    if (!exists) {
      throw new Error(errorMessage);
    }
    return await locator.textContent() || '';
  }

  /**
 * Retrieves the value of a specified attribute from a locator if it exists on the page.
 * Throws an error if the locator does not exist.
 *
 * @param locator - The Playwright Locator to retrieve the attribute from.
 * @param attribute - The name of the attribute to retrieve.
 * @param errorMessage - Custom error message if the locator does not exist.
 * @returns The value of the specified attribute.
 */
export async function getAttribute(locator: Locator, attribute: string, errorMessage: string = `Get attribute failed: Element does not exist.`) : Promise<string | null> {
    const exists = await locator.count() > 0;
    if (!exists) {
      throw new Error(errorMessage);
    }
    return await locator.getAttribute(attribute);
  }

  /**
 * Waits for a locator to be visible on the page.
 * Throws an error if the locator does not become visible within the timeout.
 *
 * @param locator - The Playwright Locator to wait for.
 * @param timeout - Maximum time to wait for the locator to be visible (in milliseconds).
 * @param errorMessage - Custom error message if the locator does not become visible.
 */
export async function waitForVisible(locator: Locator, timeout: number = 5000, errorMessage: string = 'Wait for visible failed: Element did not become visible.') {
    try {
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(errorMessage);
    }
  }

  /**
 * Waits for a locator to be hidden on the page.
 * Throws an error if the locator does not become hidden within the timeout.
 *
 * @param locator - The Playwright Locator to wait for.
 * @param timeout - Maximum time to wait for the locator to be hidden (in milliseconds).
 * @param errorMessage - Custom error message if the locator does not become hidden.
 */
export async function waitForHidden(locator: Locator, timeout: number = 5000, errorMessage: string = 'Wait for hidden failed: Element did not become hidden.') {
    try {
      await locator.waitFor({ state: 'hidden', timeout });
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  