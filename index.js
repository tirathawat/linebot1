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
    getPlaceSearch(req.query.keyword,res)
});

async function getPlaceSearch(req,res){
    let con_request = new Promise(resolve => {
        var options = {
            method: 'GET',
            uri: 'https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword='+req,
            strictSSL: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer GoAYHxN5)f(joBFE0pi3nxFskYhnb4KbM56YcBybamCON1sSA9YThRQxqw9sDLNktr6)4ZsVu6841b2ys7)xAjG=====2',
                'Accept-Language': 'en'
            }
        };
        request(options, function(error, response, body) {
            if(error!="")console.log(error)
            console.log(body)
            resolve(body)
//             resolve(JSON.parse(body));
        });
    });
    let result = await con_request;
    res.send(result)
    console.log(result)
}

    

exports = module.exports = app;
