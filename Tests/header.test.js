const mongoose = require("mongoose");
const Page = require("./Helpers/Page");
let page;
beforeAll(async () => {
  await mongoose
    .connect(
      "mongodb+srv://sourav:F2dzGDHQw1oK5RWJ@cluster0-5psdt.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
    )
    .then((er) => {
      console.log("db connected");
    });
});
beforeEach(async () => {
  page = await Page.build();
});
afterEach(async () => {
  await page.close();
});
test("run chromium browser", async () => {
  await page.goto("http://localhost:3000/");
  const logo = await page.$eval("a.Header_logo__1HQCI", (el) => el.innerHTML);
  expect(logo).toEqual("Blogster");
});
test("auth model check", async () => {
  await page.goto("http://localhost:3000/");
  await page.click(".Header_ul__2m1Cu");
  const url = await page.url();
  expect(url).toMatch(/accounts.google.com/);
});

test("after authentication", async () => {
  await page.goto("http://localhost:3000/");
  await page.login();
  const val = await page.$eval(
    'a[href="http://localhost:3000/logout"]',
    (el) => el.innerHTML
  );
  console.log(val);
  expect(val).toEqual("test");
});
