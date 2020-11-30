const axios = require('axios').default;
const cheerio = require('cheerio')
const AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-south-1",
    endpoint: "https://dynamodb.ap-south-1.amazonaws.com"
  });
const docClient = new AWS.DynamoDB.DocumentClient();
var table = "webmeta";

class Utils {
    async download_content(url)
    {
    // This Function downloads the website content and stores it in a variable.
    const html = await axios.get(url)
    return html.data
    }
    async parseHTML(html)
    {
        /* 
        This function takes the downloaded string , parses it using cheerio to get relavant meta information and returns 
        a json object
        */
        let finalObj ={}
        const chtml = cheerio.load(html)
        // console.log(chtml.html())
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
    async putdata(url,data){
        var jsondata = {
            TableName:table,
            Item:{
                "url": url,
                "data":data
            }
        };
        docClient.put(jsondata, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item successfully");
            }
        });
    }
    async getdata(url){
        var jsondata = {
            TableName:table,
            Key:{
                "url": url
            }
        };
        let resp = docClient.get(jsondata).promise()
        return resp
    }
}
exports.Utils = Utils