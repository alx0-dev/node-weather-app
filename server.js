const express = require('express');
const request = require('request');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/', (req, res) => {
    console.log('body', req.body);
    const { city } = req.body;
    let url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

    // console.log('url ', url);
    request(url, (error, response, body) => {
        if (error) {
            // res.send('Error');

            res.render('index', {
                weather: null,
                error: error,
            });
        } else {
            const { weather, main } = JSON.parse(body);
            if (weather === undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Oops, something went wrong! 😲',
                });
            } else {
                res.render('index', {
                    weather: weather[0],
                    main: main,
                    error: null,
                });
            }
            // res.send(`Success. Weather data: ${weather} main: ${main}`);
            // const { temp, feels_like, humidity } = main;
        }
    });
});

app.listen(PORT, (err) => {
    if (err) console.log(`Error ${err}`);
    else console.log(`This weather app is listening on port ${PORT}`);
});
