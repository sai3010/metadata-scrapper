const express = require('express')
const app = express()
const port = 3000
const Utils = require('./utils')
app.use(express.json())

app.post('/get_info',async (req, res) => {
  url = req.body.url
  const Util = new Utils.Utils()
  let stringHTML =await Util.download_content(url)
  const parsedjson = await Util.parseHTML(stringHTML)
  res.send(parsedjson)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
