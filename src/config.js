require('dotenv').config();

export const Constants = {
    api_key: process.env.REACT_APP_API_KEY,
    latitude: 53.480720,
    longitude: 2.240810
};

export const Appearance = {
    theme: "blue" // "blue", "black", "white"
};

export const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${Constants.latitude}&APPID=${Constants.api_key}&lon=${Constants.longitude}`;

