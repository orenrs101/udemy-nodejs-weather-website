const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib3JlbnMiLCJhIjoiY2tmNnhnbWxzMGozNjJxb3p4dGJzYTZ0MCJ9.phF2KqHVIWj14HnPE-AYNQ&limit=1"

    request({url,  json: true}, (error, {body}) => {
        if(error) {
            callback("Error! cannot connect mapbox service!", error);
        }
        else if(body.features.length === 0) {
            callback("Error! Cannot find Address GEO. Bad request");
        }
        else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, {
                longitude: longitude, 
                latitude: latitude,
                location: location
            });
        }
    });
}

module.exports = {
    geocode: geocode
}