const chromium = require("chrome-aws-lambda");
const clearElementString = require("./helpers/clearElementString");
const generateRoomSearchUrl = require("./helpers/generateRoomSearchUrl");
const { getContent } = require("./repositories/searchRoomRepository");

class BrowserService {
  static async roomSearch(checkin, checkout) {
    let browser = null;
    try {
      const searchUrl = generateRoomSearchUrl(checkin, checkout);

      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
      const page = await browser.newPage();
      await page.exposeFunction("clearElementString", clearElementString);
      await page.goto(searchUrl, {
        waitUntil: "networkidle0",
      });
      const rooms = await getContent(page);
      browser.close();
      return rooms;
    } catch (error) {
      console.log("error", error);
      browser.close();
      throw error;
    }
  }
}

module.exports = BrowserService;
