// fixtures.ts

import { test as base, expect, Page, Locator, Response } from '@playwright/test';
import { isValidRes } from '../response';

/**
 * Define the types for all helper functions.
 */
type Helpers = {
    // actions
  visit: (url: string, options?: Parameters<Page['goto']>[1]) => Promise<Response | null>;
  click: (locator: Locator, errorMessage?: string) => Promise<void>;
  rightClick: (locator: Locator, errorMessage?: string) => Promise<void>;
  doubleClick: (locator: Locator, errorMessage?: string) => Promise<void>;
  fill: (locator: Locator, value: string, errorMessage?: string) => Promise<void>;
  hover: (locator: Locator, errorMessage?: string) => Promise<void>;
  check: (locator: Locator, errorMessage?: string) => Promise<void>;
  uncheck: (locator: Locator, errorMessage?: string) => Promise<void>;
  selectOption: (locator: Locator, value: string, errorMessage?: string) => Promise<void>;
  typeText: (locator: Locator, text: string, errorMessage?: string) => Promise<void>;
  getText: (locator: Locator, errorMessage?: string) => Promise<string>;
  getAttribute: (locator: Locator, attribute: string, errorMessage?: string) => Promise<string | null>;
  waitForVisible: (locator: Locator, timeout?: number, errorMessage?: string) => Promise<void>;
  waitForHidden: (locator: Locator, timeout?: number, errorMessage?: string) => Promise<void>;
  // locators
  getByRole: (name: Parameters<Page['getByRole']>[0], options: Parameters<Page['getByRole']>[1], errorMessage?: string) => Promise<Locator>;
  getByTestId: (testId: string, errorMessage?: string) => Promise<Locator>;
  getByLabel: (label: string, options?: Parameters<Page['getByLabel']>[1], errorMessage?: string) => Promise<Locator>;
  getLocator: (selector: string, options?: Parameters<Page['locator']>[1], errorMessage?: string) => Promise<Locator>;
};

/**
 * Extend the base test with custom helper fixtures.
 */
export const test = base.extend<Helpers>({
  /**
   * Implement the 'visit' helper.
   */
  visit: async ({ page }, use) => {
    const visit = async (url: string, options?: Parameters<Page['goto']>[1]): Promise<Response | null> => {
      const res = await page.goto(url, options);
      isValidRes(res);
      return res;
    };
    await use(visit);
  },

  /**
   * Implement the 'click' helper.
   */
  click: async ({ page }, use) => {
    const click = async (
      locator: Locator,
      errorMessage: string = 'Click failed: element does not exist:'
    ): Promise<void> => {
      await locator.click();
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
    };
    await use(click);
  },

  /**
   * Implement the 'fill' helper.
   */
  fill: async ({ page }, use) => {
    const fill = async (
      locator: Locator,
      value: string,
      errorMessage: string = 'Fill failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.fill(value);
    };
    await use(fill);
  },

  /**
   * Implement the 'hover' helper.
   */
  hover: async ({ page }, use) => {
    const hover = async (
      locator: Locator,
      errorMessage: string = 'Hover failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.hover();
    };
    await use(hover);
  },

  /**
   * Implement the 'doubleClick' helper.
   */
  doubleClick: async ({ page }, use) => {
    const doubleClick = async (
      locator: Locator,
      errorMessage: string = 'Double-click failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.dblclick();
    };
    await use(doubleClick);
  },

  /**
   * Implement the 'rightClick' helper.
   */
  rightClick: async ({ page }, use) => {
    const rightClick = async (
      locator: Locator,
      errorMessage: string = 'Right-click failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.click({button:'right'});
    };
    await use(rightClick);
  },

  /**
   * Implement the 'check' helper.
   */
  check: async ({ page }, use) => {
    const check = async (
      locator: Locator,
      errorMessage: string = 'Check failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.check();
    };
    await use(check);
  },

  /**
   * Implement the 'uncheck' helper.
   */
  uncheck: async ({ page }, use) => {
    const uncheck = async (
      locator: Locator,
      errorMessage: string = 'Uncheck failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.uncheck();
    };
    await use(uncheck);
  },

  /**
   * Implement the 'selectOption' helper.
   */
  selectOption: async ({ page }, use) => {
    const selectOption = async (
      locator: Locator,
      value: string,
      errorMessage: string = 'Select option failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.selectOption(value);
    };
    await use(selectOption);
  },

  /**
   * Implement the 'typeText' helper.
   */
  typeText: async ({ page }, use) => {
    const typeText = async (
      locator: Locator,
      text: string,
      errorMessage: string = 'Type failed: Element does not exist.'
    ): Promise<void> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      await locator.type(text);
    };
    await use(typeText);
  },

  /**
   * Implement the 'getText' helper.
   */
  getText: async ({ page }, use) => {
    const getText = async (
      locator: Locator,
      errorMessage: string = 'Get text failed: Element does not exist.'
    ): Promise<string> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      const text = await locator.textContent();
      return text ? text.trim() : '';
    };
    await use(getText);
  },

  /**
   * Implement the 'getAttribute' helper.
   */
  getAttribute: async ({ page }, use) => {
    const getAttribute = async (
      locator: Locator,
      attribute: string,
      errorMessage: string = 'Get attribute failed: Element does not exist.'
    ): Promise<string | null> => {
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);
      return await locator.getAttribute(attribute);
    };
    await use(getAttribute);
  },

  /**
   * Implement the 'waitForVisible' helper.
   */
  waitForVisible: async ({ page }, use) => {
    const waitForVisible = async (
      locator: Locator,
      timeout: number = 5000,
      errorMessage: string = 'Wait for visible failed: Element did not become visible.'
    ): Promise<void> => {
      try {
        await locator.waitFor({ state: 'visible', timeout });
      } catch (error) {
        throw new Error(errorMessage);
      }
    };
    await use(waitForVisible);
  },

  /**
   * Implement the 'waitForHidden' helper.
   */
  waitForHidden: async ({ page }, use) => {
    const waitForHidden = async (
      locator: Locator,
      timeout: number = 5000,
      errorMessage: string = 'Wait for hidden failed: Element did not become hidden.'
    ): Promise<void> => {
      try {
        await locator.waitFor({ state: 'hidden', timeout });
      } catch (error) {
        throw new Error(errorMessage);
      }
    };
    await use(waitForHidden);
  },

  getByRole: async ({ page }, use) => {
    const getByRole = async (
      name: Parameters<Page['getByRole']>[0],
      options: Parameters<Page['getByRole']>[1],
      errorMessage: string = `Element with role "${name}" and options "${JSON.stringify(options)}" was not found.`
    ): Promise<Locator> => {
      const loc: Locator = page.getByRole(name, options);
  
      // Check if the element exists
      if (!(await elementExists(loc))) throw new Error(`${errorMessage} ${loc}`);
      return loc;
    };
  
    await use(getByRole);
  },

  getByTestId: async ({ page }, use) => {
    const getByTestId = async (
      testId: string,
      errorMessage: string = `Element with data-testid="${testId}" was not found.`
    ): Promise<Locator> => {
      const locator: Locator = page.locator(`[data-testid="${testId}"]`);

       // Check if the element exists
       if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);

      return locator;
    };

    await use(getByTestId);
  },

  getByLabel: async ({ page }, use) => {
    const getByLabel = async (
      label: string,
      options?: Parameters<Page['getByLabel']>[1],
      errorMessage: string = `Element with label "${label}" and options "${JSON.stringify(options)}" was not found.`
    ): Promise<Locator> => {
      const locator: Locator = page.getByLabel(label, options);

      // Check if the element exists
      if (!(await elementExists(locator))) throw new Error(`${errorMessage} ${locator}`);

      return locator;
    };

    await use(getByLabel);
  },

  /**
   * Implement the 'getLocator' helper to find a generic element by CSS selector.
   */
  getLocator: async ({ page }, use) => {
    const getLocator = async (
      selector: Parameters<Page['locator']>[0],
      options: Parameters<Page['locator']>[1],
      errorMessage: string = `Element with selector "${selector}" was not found.`
    ): Promise<Locator> => {
      const loc: Locator = page.locator(selector);

      // Check if the element exists
      if (!(await elementExists(loc))) throw new Error(`${errorMessage} ${loc}`);
      return loc;
    };

    await use(getLocator);
  },
});

/**
 * Helper function to check if a locator exists on the page.
 * @param locator - The Playwright Locator to check.
 * @returns A promise that resolves to true if the locator exists, false otherwise.
 */
async function elementExists(locator: Locator): Promise<boolean> {
  const count = await locator.count();
  return count > 0;
}

/**
 * Re-export the 'expect' assertion from Playwright.
 */
export { expect };

