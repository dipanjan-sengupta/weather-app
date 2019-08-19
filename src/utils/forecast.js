const request = require('request');
const proxy = 'http://proxy.cognizant.com:6050';

const token = '306406044bd4e1b5f1fc8da8db04575b';
const baseUrl = 'https://api.darksky.net/forecast/';
const qs = {
    lang: 'en',
    units: 'si'
};

const forecast = (latitude, longitude, callback) => {
    const uri = token + '/' + latitude + ',' + longitude;
    request({ uri, baseUrl, qs, proxy, rejectUnauthorized: false, json: true }, (error, response, body) => {
        if (error) {
            callback('Weather service unavailable. Please try later.', undefined);
        } else if (body.error) {
            callback('Weather information cannot be retrieved.', undefined);
        } else {
            callback(undefined, body);
        }
    });
}

module.exports = forecast;