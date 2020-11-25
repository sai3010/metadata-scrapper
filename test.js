const Utils = require('./utils')
const Util = new Utils.Utils()
testurl = "https://jestjs.io/docs/en/getting-started.html"
let res
test('Downloads content from url', async() => {
  res = await Util.download_content(testurl)
  expect(res);
});

test('Parsing HTML from downloaded content', async() => {
    result = await Util.parseHTML(res)
    check = true
    if(result == undefined) {
        check = false
        console.log("No content parsed")
    }
    expect(check).toBe(true);
  });