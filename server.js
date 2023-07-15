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
    const { city } = req.body;
    let url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

    request(url, (error, response, body) => {
        if (error) {
            res.render('index', {
                weather: null,
                error: error,
            });
        } else {
            const parsedBody = JSON.parse(body);

            if (parsedBody.cod !== 200) {
                res.render('index', {
                    weather: null,
                    error: `${parsedBody.message}. Please try again.`,
                });
            } else {
                const { weather, main, name, sys, wind, visibility } =
                    parsedBody;
                const { country } = sys;
                const { temp, feels_like, temp_min, temp_max, humidity } = main;
                const { speed } = wind;
                const currentDate = new Date();
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };

                if (weather === undefined) {
                    res.render('index', {
                        weather: null,
                        error: 'Oops, something went wrong! 😲',
                    });
                } else {
                    res.render('index', {
                        weather: weather[0],
                        location: `${name}, ${country}`,
                        date: currentDate.toLocaleDateString(
                            undefined,
                            options
                        ),
                        temperature: Math.round(temp),
                        feelsLike: Math.round(feels_like),
                        tempMin: Math.round(temp_min),
                        tempMax: Math.round(temp_max),
                        humidity: `${humidity}%`,
                        wind: Math.round(speed),
                        visibility: Math.round(visibility / 1000),
                        error: null,
                    });
                }
            }
        }
    });
});

app.listen(PORT, (err) => {
    if (err) console.log(`Error ${err}`);
    else console.log(`This weather app is listening on port ${PORT}`);
});
