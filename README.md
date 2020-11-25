# metadata-scrapper
- REST API’s for retrieving metadata information from a given URL.

# How to run the project
- make sure to have nodejs 12+ along with npm installed
- Install the dependencies
    - `npm install`
- Start the server 
    - `npm start`

# List of supported Api's
- `POST` -> http://localhost:3000/get_info
```bash
    curl --location --request POST 'http://localhost:3000/get_info' --header 'Content-Type: application/json' \
    --data-raw '{ 
    "url":"https://ogp.me/" 
    }'
```
# Sample Response
```json
{
    "title": "The Open Graph protocol",
    "description": "The Open Graph protocol enables any web page to become a rich object in a social graph.",
    "ogTitle": "Open Graph protocol",
    "ogImage": "https://ogp.me/logo.png",
    "ogtype": "website",
    "ogurl": "https://ogp.me/",
    "fromCache": false
}
```
- Note : `fromCache` is a field that indicates if the response is returned from cache.
