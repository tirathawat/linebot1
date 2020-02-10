var express = require('express');
var app = express();
var port = process.env.PORT || 5001;

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
    console.log(req.query.keyword)
    var url = 'https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword='+(req.query.keyword)
    url = encodeURI(url)
    console.log(url)
        let con_request = new Promise(resolve => {
            var options = {
                method: 'GET',
                uri: url,
                // strictSSL: false,
                // body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer G(Ao51HbIP9mfF39IHiNH0mgj9Umj5KK(QxYb6iAjtZE6hXcksHH6wWA)MEuLLu1nb3t(TDhVW1kgtAF5mc5XYG=====2',
                    'Accept-Language': 'th',
                }
            };
            request(options, function(error, response, body) {
                try{
                    resolve(JSON.parse(body));
                }
                catch(err){
                    resolve('')
                }
            });
        });
        let result = await con_request;
        var returnObject = {
            place_name : "",
            place_id:""
        }
        try{
            returnObject.place_name =result.result[0].place_name
            returnObject.place_id =result.result[0].place_id
        }
        catch(err){
            returnObject.place_name = 'ไม่พบสถานที่ดังกล่าว'
        }
        res.send(returnObject)
    }
    

exports = module.exports = app;
