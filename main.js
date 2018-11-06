const weather = require('yahoo-weather');

const getWeather = async (city) => {
    const weath = await weather(city);
    console.log(weath)
}

getWeather('kharkov');