/**
 * @name Skyscanner search
 *
 * @desc  Look for flights from Amsterdam to Bogota
 * Currently fails due to bots checker from Google
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
    await page.goto("https://www.skyscanner.net/");
    await page.waitForSelector('#origin-fsc-search')
    await page.type('#origin-fsc-search', 'A');
    await page.type('#origin-fsc-search', 'Amsterdam (AMS)');
    await page.type('#destination-fsc-search', 'B');
    await page.type('#destination-fsc-search', 'Bogota (BOG)');

    const search = await page.evaluate(() => {
      return document.querySelector('#flights-search-controls-root span + button').classList[0];
    })
    
    await page.click("." + search); 
    await page.waitFor(25000) 
    await page.waitForSelector('.g-recaptcha')
    await page.click(".g-recaptcha");
    await page.waitFor(1000)
    await page.click(".g-recaptcha");
    await page.screenshot({path: 'skyscanner.png'});
    
    await browser.close();
  })();