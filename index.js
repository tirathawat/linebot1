var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var body = require('body-parser');
app.use(body())

const request = require('request-promise');

app.listen(port);
console.log('The magic happens on port ' + port);

const config = require('./config.json');

const Aftership = require('aftership')('973859e8-9d21-4715-9baa-fd0ccf2fd133');

app.get('/',(req,res)=>{
    console.log('/')
    res.send(req.body.name)
    // res.send("123123123")
});
app.get('/api/thaipost',(req,res)=>{
    console.log(req.query.id)
    console.log('/api/:id')
    gettrack(req,req.query.id,res)
    // DetectTrack(req,'EF582568151TH',res)
});

///Thai Post
    async function gettrack(req, message,res)
    {
        let promise_token = new Promise(resolve => {
            var options = {
                method: 'POST',
                uri: 'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
                strictSSL: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + config.thaipost.token
                }
            };
            request(options, function(error, response, body) {
                console.log(error)
                resolve(JSON.parse(body));
            });
        });
        
        let access_token = await promise_token;
        let params = {
            "status": "all",
            "language": "TH",
            "barcode": [
                message
           ]
        };
        let promise_track = new Promise(resolve => {
            var options = {
                method: 'POST',
                uri: 'https://trackapi.thailandpost.co.th/post/api/v1/track',
                strictSSL: false,
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + access_token.token
                }
            };
            
            request(options, function(error, response, body) {
                // console.log("Requested Items")
                resolve( JSON.parse(body) );
            });
        });

        let tracks = await promise_track;
        
        // console.log(tracks.response.items)
        // res.send(tracks.response.items[message])

        var lastCheckpoint;
        
        tracks.response.items[message].forEach(element => {
            console.log(element.status_description)
            lastCheckpoint = element.status_description
        });

        const returnObj = {
            message : 'สถานะปัจจุบัน : '+lastCheckpoint
        }
        // res.send(tracks.response.items['EF58256815'])
        // res.send(tracks.response.items)
        res.send(returnObj)
        
    }
///


    async function DetectTrack(req,code,res){
        
        let body = {
            'tracking': {
                'title': 'New Title'
            }
        };
        Aftership.call('PUT', '/trackings/thai-posts/EF582568151TH', {
            body: body
        }, function (err, result) {
            // Your code here
            console.log(result)
        });

        res.send('Connection Complete') 
    }

exports = module.exports = app;