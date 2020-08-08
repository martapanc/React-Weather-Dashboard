import clouds from './assets/icons/cloudy.svg';
import sunny from './assets/icons/sunny.svg';

require('dotenv').config();

export const Constants = {
    api_key: process.env.REACT_APP_API_KEY,
    latitude: 53.480720,
    longitude: -2.240810,
    locale: 'en-GB',
    units: 'metric', //default, metric, imperial
    refresh: 600 * 1000, //milliseconds
};

export function getDegreeSymbol(unit) {
    switch (unit) {
        case 'metric':
            return '°C';
        case 'imperial':
            return '°F';
        default:
            return 'K';
    }
}

export function getWindSpeedSymbol(unit) {
    switch (unit) {
        case 'imperial':
            return ' mph';
        case 'metric':
        default:
            return ' m/s';
    }
}


export const Appearance = {
    theme: "blue" // "blue", "black", "white"
};

export const IconMap = {
    clouds: clouds,
    notFound: sunny
};

const api_url_ow = `https://api.openweathermap.org/data/2.5/onecall?APPID=${Constants.api_key}&lat=${Constants.latitude}&lon=${Constants.longitude}&units=${Constants.units}`;
const api_url_test = 'http://localhost:8082';

export const api_url = api_url_ow;

console.log("args: " + process.argv);
