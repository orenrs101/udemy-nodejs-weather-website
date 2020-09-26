const geocodeUtils = require('./utils/geocode.js');
const forecastUtils = require('./utils/forecast.js');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

//Starting express
const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //this way you can give the views folder a different name than the default 'views'
hbs.registerPartials(partialsPath);

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath)); // //This is what you will get in the main page (localhost:3000)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Oren Shlomi'
    }); //this will render hbs templates - wil lrender whatever in the "views" folder with the name index
});

//localhost:3000/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Oren Shlomi'
    }); 
});

//localhost:3000/about
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: "I'm here to help!"
    }); 
});

//localhost:3000/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No Address was provided'
        });
    }

    geocodeUtils.geocode(req.query.address, (geocodeError, { latitude, longitude, location } = {}) => {
        if(geocodeError) {
            return res.send({
                error: 'GEO Error:' + geocodeError
            });
        }

        forecastUtils.getForecast(latitude, longitude, (forecastError, { description, temperature, feelslike } = {})=> {
            if(forecastError) {
                return res.send({
                    error: 'Forecast error: ' + forecastError
                })
            }
            return res.send({
                location: location,
                forecast: description + ". Temperature is: " + temperature + ", But feels like: " + feelslike
            });
        });
    });
    // res.send({
    //     forecase: '31 degrees', 
    //     location: 'Israel',
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide Search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help Article Was Not Found'
    });
});

app.get('*', (req, res) => {
    res.render('404',  {
        errorMsg: 'Page was not found!'
    });
});

//Start up the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});