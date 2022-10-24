const puppeteer = require('puppeteer');
const { tableParser } = require('puppeteer-table-parser');

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.ercot.com/content/cdr/html/real_time_spp.html');

  const data = await tableParser(page, {
    selector: 'table',
    allowedColNames: {
      "Interval Ending": "Interval Ending",
      'LZ_HOUSTON': 'Houston'
    },
    asArray: true
  });
  console.log(data);
  console.log(data.length);
  console.log(data[data.length - 1]);

  browser.close();
}

run();