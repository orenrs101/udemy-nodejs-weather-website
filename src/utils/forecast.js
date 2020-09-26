const request = require('request');

const getForecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=aba4d3841f75a0b0dff66852f5c40137&query=" + latitude + "," +longitude + "&units=m";
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Error! Unable to connect to weather service!", error);
        }
        else if(body.error) {
            callback("Error. Unable to find location!", body.error);
        }
        else {
            const currentForecast = body.current;
            callback(undefined, {
                description: currentForecast.weather_descriptions[0],
                temperature: currentForecast.temperature,
                feelslike: currentForecast.feelslike
            });
        }
    });
}

module.exports = {
    getForecast: getForecast
}