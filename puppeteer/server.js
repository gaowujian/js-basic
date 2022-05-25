const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://cn.vuejs.org/v2/guide/components.html");
    await page.pdf({ path: "screen.pdf", printBackground: true });
    await page.screenshot({ path: "example.png" });

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
