import { browser } from 'k6/browser';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
      ui: {
        executor: 'shared-iterations',
        options: {
          browser: {
                type: 'chromium',
          },
        },
      },
    }
  }

export default async function () {
    const page = browser.newPage();
    await (await page).goto('https://test.k6.io/my_messages.php');

    check(page, {
        'check page header': (await page).locator('body > h2').textContent() === 'Unauthorized'
    });

    (await page).locator('input[name="login"]').type('admin');
    (await page).locator('input[name="password"]').type('123');
    (await page).locator('input[type=submit]').click();
    (await page).waitForFunction();

    (await page).screenshot({ path: 'screenshots/2-authenticated.png' });

    check(page, {
        'check page header':(await page).locator('body > h2').textContent() === 'Welcome, admin!'
    });

}

// $env:K6_BROWSER_HEADLESS = "false"
// k6 run browser.js