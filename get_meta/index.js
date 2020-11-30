const Utils = require('./utils')
module.exports = async function (context, req) {
    process.env.AWS_ACCESS_KEY_ID = "AKIAR5PQPNZY36GHMPUS"
    process.env.AWS_SECRET_ACCESS_KEY = "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"
    context.log('JavaScript HTTP trigger function processed a request.');
    try {
        let parsedjson
        let url = req.body.url
        const Util = new Utils.Utils()
        let stringHTML = await Util.download_content(url)
        // check cache
        let cache_data = await Util.getdata(url)
        // console.log(cache_data)
        if (Object.keys(cache_data).length === 0) {
            cache_data['status'] = false
        }
        else {
            cache_data['status'] = true
        }
        if (!cache_data['status']) {
            parsedjson = await Util.parseHTML(stringHTML)
            await Util.putdata(url, parsedjson)
            console.log(parsedjson)
            parsedjson['fromCache'] = false
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: parsedjson,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        else {
            parsedjson = cache_data.Item.data
            parsedjson['fromCache'] = true
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: parsedjson,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
    } catch (error) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {"message":"server error", "error": error.message },
            headers: {
                'Content-Type': 'application/json'
            }
        },500;
    }
}
