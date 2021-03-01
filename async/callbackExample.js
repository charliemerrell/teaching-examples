const request = require('request');

function handleResponse(err, res, body) {
    console.log(body);
}

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, handleResponse);
