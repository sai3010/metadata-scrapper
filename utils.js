const axios = require('axios').default;
const cheerio = require('cheerio')
class Utils {
    async download_content(url)
    {
    const html = await axios.get(url)
    // console.log(typeof(html.data))
    return html.data
    }
    async parseHTML(html)
    {
        let finalObj ={}
        const chtml = cheerio.load(html)
        // console.log(chtml.html())
        let head = chtml('head');
        // console.log(head.html())
        let title = chtml('head title').text()
        let desc = chtml('meta[name="description"]').attr('content')
        let kwd = chtml('meta[name="keywords"]').attr('content')
        let ogTitle = chtml('meta[property="og:title"]').attr('content')
        let ogImage = chtml('meta[property="og:image"]').attr('content')
        let ogtype = chtml('meta[property="og:type"]').attr('content')
        let ogurl = chtml('meta[property="og:url"]').attr('content')
        let ogkeywords = chtml('meta[property="og:keywords"]').attr('content')
        // console.log(desc)
        finalObj.title = title
        finalObj.description = desc
        finalObj.ogTitle = ogTitle
        finalObj.keywords = kwd
        finalObj.ogImage = ogImage
        finalObj.ogkeywords = ogkeywords
        finalObj.ogtype = ogtype
        finalObj.ogurl = ogurl
        return finalObj
    }
}
exports.Utils = Utils