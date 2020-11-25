const express = require('express')
const app = express()
const port = 3000
const Utils = require('./utils')
const NodeCache = require( "node-cache" );
const Cache = new NodeCache({checkperiod: 120});
app.use(express.json())

app.post('/get_info',async (req, res) => {
  url = req.body.url
  const Util = new Utils.Utils()
  let stringHTML =await Util.download_content(url)
  if(Cache.get(url) == undefined)
  {
    
    const parsedjson = await Util.parseHTML(stringHTML)
    Cache.set(url,parsedjson)
    parsedjson['fromCache'] = false
    res.send(parsedjson)
  }
  else
  {
    const parsedjson = Cache.get(url)
    parsedjson['fromCache'] = true
    res.send(parsedjson)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
