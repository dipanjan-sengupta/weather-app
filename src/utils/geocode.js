const request = require('request');
const proxy = '';

const token = 'pk.eyJ1IjoiZGlwYW5qYW4iLCJhIjoiY2l5azZpdmx1MDAxcDJxcGE2a2NxNXB1YiJ9.48JsofvzGJR7BDqlrSy7Hw';
const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const qs = {
    access_token: token,
    limit: 1
};

const geocode = (address, callback) => {
    const uri = encodeURIComponent(address) + '.json';
    request({ uri, baseUrl, qs, proxy, rejectUnauthorized: false, json: true }, (error, response, body) => {
        if (error) {
            callback('Location service unavailable. Please try later.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            });
        }
    })
}

module.exports = geocode;