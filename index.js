const express = require('express')
const app = express()
const port = 3000
const Utils = require('./utils')
const NodeCache = require("node-cache");
const Cache = new NodeCache({ checkperiod: 120 });
var logger = require('./log')
app.use(express.json())

app.post('/get_info', async (req, res) => {
    try {
        let parsedjson
        url = req.body.url
        const Util = new Utils.Utils()
        let stringHTML = await Util.download_content(url)
        // check cache
        if (Cache.get(url) == undefined) {
            parsedjson = await Util.parseHTML(stringHTML)
            Cache.set(url, parsedjson)
            parsedjson['fromCache'] = false
            res.send(parsedjson)
        }
        else {
            parsedjson = Cache.get(url)
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
