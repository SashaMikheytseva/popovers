import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: true, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test('Popover appears', async () => {
    await page.goto(baseUrl);

    const btn = await page.$('.btn');

    await btn.click();

    await page.waitForSelector('.pop');
  });

  test('Popover disappears', async () => {
    await page.goto(baseUrl);

    const btn = await page.$('.btn');

    await btn.click();
    await btn.click();

    await page.waitForFunction(() => !document.querySelector('.pop'));
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
