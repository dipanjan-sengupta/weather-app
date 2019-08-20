const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const formatter = require('./utils/formatter');

const app = express();
const port = process.env.PORT || 3000;

const public = path.join(__dirname, '../public');
const views = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partials);

app.use(express.static(public));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dipanjan Sengupta'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Dipanjan Sengupta'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dipanjan Sengupta',
        message: 'How can i help you today?'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must enter a location.'
        })
    }
    geocode(address, (error, { location, longitude, latitude } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({ error })
            }
            const forecast = (response.daily.summary) + ' It is ' + response.currently.temperature + '°C now with ' + formatter((response.currently.precipProbability * 100), 2) + '% chance of rain. The highest and lowest temperatures during the day are expected to be ' + response.daily.data[0].temperatureHigh + '°C and ' + response.daily.data[0].temperatureLow + '°C respectively with ' + ((response.daily.data[0].precipProbability) * 100) + '% chance of rain.';
            res.send({ location, forecast })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Dipanjan Sengupta'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Dipanjan Sengupta'
    });
})

app.listen(port, () => {
    console.log('server started on port ' + port);
})