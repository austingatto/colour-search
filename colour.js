const express = require('express')
const router = express.Router()
module.exports = router

//Bing Search API Setup:
let https = require('https');
let key1 = '51c57387459e432e97d8683dcaf879f3'
let key2 = 'b10ecb4e017446008f64a9bbfd3a6cc8'
let subscriptionKey = key1;
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';

const fs = require('fs');
const download = require('download');

const vibrant = require('node-vibrant')
const convert = require('color-convert');

router.get('/:term', (req, res) => {
    /*----PROVIDED_CODE_START----*/
    let bing_image_search = function (search) {
        let request_params = {
            method: 'GET',
            hostname: host,
            path: path + '?q=' + encodeURIComponent(search),
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
            }
        };

        let req = https.request(request_params, response_handler);
        req.end();
    }
    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            return_response(body)
        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };
    /*----PROVIDED_CODE_END----*/
    var term = req.params.term
    console.log('Searching bing for images of: ' + term)
    bing_image_search(term);
    let return_response = function (body) {
        body = JSON.parse(body)

        var images = []
        body.value.slice(0, 10).forEach(result => {
            images.push(result.contentUrl)
        });

        images.forEach(url => {
            download(url, 'dist').then(() => {
                console.log('done!');
            });
        })

    }
})



