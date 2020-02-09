var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var body = require('body-parser');
app.use(body())

const request = require('request-promise');

app.listen(port);
console.log('The magic happens on port ' + port);

app.get('/',(req,res)=>{
    console.log('/')
    res.send(req.body.name)
    // res.send("123123123")
});

app.get('/api/tour',(req,res)=>{
    console.log('/api/tour')
    getPlaceSearch(req,res)
});

async function getPlaceSearch(req,res){
    var url = 'https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword='
    let params = {
        "keyword":req.query.keyword
    };
        let con_request = new Promise(resolve => {
            var options = {
                method: 'GET',
                uri: url,
                strictSSL: false,
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer G(Ao51HbIP9mfF39IHiNH0mgj9Umj5KK(QxYb6iAjtZE6hXcksHH6wWA)MEuLLu1nb3t(TDhVW1kgtAF5mc5XYG=====2',
                    'Accept-Language': 'en'
                }
            };
            request(options, function(error, response, body) {
                if(error!="")console.log(error)
                // console.log(body)
                resolve(JSON.parse(body));
            });
        });
        let result = await con_request;
        res.send(result)
        console.log(result)
    }
    

exports = module.exports = app;
