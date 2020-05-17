const puppeteer = require("puppeteer");
const sessionFactory = require("../Factories/sessionFactory");
const userFactory = require("../Factories/userFactory");
module.exports = class Page {
  static async build() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    const customPage = new Page(page);

    return new Proxy(customPage, {
      get: (target, property) => {
        return target[property] || browser[property] || page[property];
      },
    });
  }
  constructor(page) {
    this.page = page;
  }
  async login() {
    const user = await userFactory();
    console.log(user);
    const { session, sig } = sessionFactory(user);
    await this.page.setCookie({ name: "express:sess", value: session });
    await this.page.setCookie({
      name: "express:sess.sig",
      value: sig,
    });
    await this.page.goto("http://localhost:3000/");
    await this.page.waitFor('a[href="http://localhost:3000/logout"]');
  }
};
