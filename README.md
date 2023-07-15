# Node Weather App

A simple weather app pet project made in Node, Express and ejs which leverages the OpenWeatherMap API. It displays the current weather information based on the entered city.

## Installation and setup

### Installation

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install
```

### Running the application

```sh
$ npm start
```

### Running the application in dev mode

Dev mode utilizes [nodemon](https://nodemon.io/) which allows continuous monitoring for changes made in the app.

```sh
$ npm run dev
```

### Opening the application

By default, the application is listening to port 5000.

```sh
http://localhost:5000/
```

### Environment Variables

An .env file containing the environment variables needed by the application to run needs to be created in the root directory.

```sh
# .env

# Base url of the OpenWeatherMap API
API_URL='https://api.openweathermap.org/data/2.5/weather'

# API key generated in OpenWeatherMap
API_KEY='<OpenWeatherMap API key>'

# Port which the application is listening to
PORT=5000
```

## OpenWeatherMap API

This application creates a request to the OpenWeatherMap API to get a city's [current weather data](https://openweathermap.org/current).

Check [OpenWeatherMap FAQs](https://openweathermap.org/faq) for instructions on how to create an API key.

More info on [OpenWeatherMap Guide](https://openweathermap.org/guide).
