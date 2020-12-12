const express = require('express')
const app = express()
const port = 3000
const Utils = require('./utils')
var logger = require('./log')
const serverless = require('serverless-http');
app.use(express.json())

app.post('/get_info', async (req, res) => {
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
            res.send(parsedjson)
        }
        else {
            parsedjson = cache_data.Item.data
            parsedjson['fromCache'] = true
            res.send(parsedjson)
        }
        logger.info({ "message": "data sent successfully", "cache": parsedjson['fromCache'] })
    } catch (error) {
        logger.error({ "message": "error while sending data", "error": error.message })
        res.status(500).send({ "message": "server error", "error": error.message })
    }

})

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})
module.exports.handler = serverless(app);