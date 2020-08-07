import clouds from './assets/icons/cloudy.svg';
import sunny from './assets/icons/sunny.svg';

require('dotenv').config();

export const Constants = {
    api_key: process.env.REACT_APP_API_KEY,
    latitude: 53.480720,
    longitude: 2.240810,
    units: 'metric', //default, metric, imperial
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

export const api_url = `https://api.openweathermap.org/data/2.5/onecall?APPID=${Constants.api_key}&lat=${Constants.latitude}&lon=${Constants.longitude}&units=${Constants.units}`;

