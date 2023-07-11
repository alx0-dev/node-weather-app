const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.render('index', { weather: null, error: null });
    res.send('Welcome to the weather app 👋');
});

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `${process.env.API_URL}?q=${city}&units=metric&appid=${process.env.API_KEY}`;

    request(url, (error, response, body) => {
        if (error) {
            res.send('Error');
            // res.render('index', {
            //     weather: null,
            //     error: 'Oops, something went wrong!',
            // });
        } else {
            let weather = JSON.parse(body);
            res.send(`Success. Weather data: ${weather}`);
            // weather
        }
    });
});
console.log('port', PORT);
app.listen(PORT, (err) => {
    if (err) console.log(`Error ${err}`);
    else console.log(`This weather app is listening on port ${PORT}`);
});
