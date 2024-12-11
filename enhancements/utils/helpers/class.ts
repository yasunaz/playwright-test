// helpers/PageHelper.ts

import { Page, Locator, Response } from '@playwright/test';
import { isValidRes } from '../response'; // Ensure correct path

/**
 * PageHelper class encapsulates common Playwright actions with existence checks.
 */
export class PageHelper {
  public page: Page;

  /**
   * Initializes the PageHelper with the current Playwright Page.
   * @param page - The Playwright Page instance.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specified URL and validates the response.
   * @param url - The URL to navigate to.
   * @returns The response received from navigating to the URL.
   */
  async visit(url: string): Promise<Response | null> {
    const res = await this.page.goto(url);
    isValidRes(res);
    return res;
  }

  /**
   * Clicks on a locator if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to click.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async click(locator: Locator, errorMessage: string = 'Click failed: element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.click();
  }

  /**
   * Fills a locator with a specified value if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to fill.
   * @param value - The value to fill into the locator.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async fill(locator: Locator, value: string, errorMessage: string = 'Fill failed: Element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.fill(value);
  }

  /**
   * Hovers over a locator if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to hover.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async hover(locator: Locator, errorMessage: string = 'Hover failed: Element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.hover();
  }

  /**
   * Double-clicks on a locator if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to double-click.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async doubleClick(locator: Locator, errorMessage: string = 'Double-click failed: Element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.dblclick();
  }

  /**
   * Checks a locator (e.g., checkbox or radio button) if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to check.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async check(locator: Locator, errorMessage: string = 'Check failed: Element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.check();
  }

  /**
   * Unchecks a locator (e.g., checkbox) if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to uncheck.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async uncheck(locator: Locator, errorMessage: string = 'Uncheck failed: Element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.uncheck();
  }

  /**
   * Selects an option in a dropdown locator if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator representing the select element.
   * @param value - The value of the option to select.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async selectOption(locator: Locator, value: string, errorMessage: string = 'Select option failed: Element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.selectOption(value);
  }

  /**
   * Types text into a locator if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to type into.
   * @param text - The text to type.
   * @param errorMessage - Custom error message if the locator does not exist.
   */
  async typeText(locator: Locator, text: string, errorMessage: string = 'Type failed: Element does not exist.'): Promise<void> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    await locator.type(text);
  }

  /**
   * Retrieves the text content of a locator if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to retrieve text from.
   * @param errorMessage - Custom error message if the locator does not exist.
   * @returns The text content of the locator.
   */
  async getText(locator: Locator, errorMessage: string = 'Get text failed: Element does not exist.'): Promise<string> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    const text = await locator.textContent();
    return text ? text.trim() : '';
  }

  /**
   * Retrieves the value of a specified attribute from a locator if it exists on the page.
   * Throws an error if the locator does not exist.
   * @param locator - The Playwright Locator to retrieve the attribute from.
   * @param attribute - The name of the attribute to retrieve.
   * @param errorMessage - Custom error message if the locator does not exist.
   * @returns The value of the specified attribute.
   */
  async getAttribute(locator: Locator, attribute: string, errorMessage: string = `Get attribute failed: Element does not exist.`): Promise<string | null> {
    if (!(await this.elementExists(locator))) {
      throw new Error(errorMessage);
    }
    return await locator.getAttribute(attribute);
  }

  /**
   * Waits for a locator to be visible on the page.
   * Throws an error if the locator does not become visible within the timeout.
   * @param locator - The Playwright Locator to wait for.
   * @param timeout - Maximum time to wait for the locator to be visible (in milliseconds).
   * @param errorMessage - Custom error message if the locator does not become visible.
   */
  async waitForVisible(locator: Locator, timeout: number = 5000, errorMessage: string = 'Wait for visible failed: Element did not become visible.'): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(errorMessage);
    }
  }

  /**
   * Waits for a locator to be hidden on the page.
   * Throws an error if the locator does not become hidden within the timeout.
   * @param locator - The Playwright Locator to wait for.
   * @param timeout - Maximum time to wait for the locator to be hidden (in milliseconds).
   * @param errorMessage - Custom error message if the locator does not become hidden.
   */
  async waitForHidden(locator: Locator, timeout: number = 5000, errorMessage: string = 'Wait for hidden failed: Element did not become hidden.'): Promise<void> {
    try {
      await locator.waitFor({ state: 'hidden', timeout });
    } catch (error) {
      throw new Error(errorMessage);
    }
  }

  /**
   * Helper method to check if an element exists on the page.
   * @param locator - The Playwright Locator to check.
   * @returns Boolean indicating existence.
   */
  private async elementExists(locator: Locator): Promise<boolean> {
    const count = await locator.count();
    return count > 0;
  }
}
