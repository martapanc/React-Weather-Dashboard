import cloudy from './assets/icons/cloudy.svg';
import sunny from './assets/icons/sunny.svg';
import mostlySunny from './assets/icons/mostlysunny.svg';
import partlySunny from './assets/icons/partlysunny.svg';
import mostlyCloudy from './assets/icons/mostlycloudy.svg';
import rain from './assets/icons/rain.svg';
import chanceRain from './assets/icons/chancerain.svg';
import chancetstorms from './assets/icons/chancetstorms.svg';
import tstorms from './assets/icons/tstorms.svg';
import snow from './assets/icons/tstorms.svg';
import chanceSleet from './assets/icons/chancesleet.svg';
import sleet from './assets/icons/sleet.svg';
import chanceFlurries from './assets/icons/chanceflurries.svg';
import flurries from './assets/icons/flurries.svg';
import fog from './assets/icons/fog.svg';
import hazy from './assets/icons/hazy.svg';
import wind from './assets/icons/wind.svg';
import unknown from './assets/icons/unknown.svg';

require('dotenv').config();

export const Constants = {
    api_key: process.env.REACT_APP_API_KEY,
    latitude: 53.480720,
    longitude: -2.240810,
    locale: 'en-GB',
    units: 'metric', //default, metric, imperial
    refresh: 10 * 60 * 1000, //milliseconds
};

export const Appearance = {
    theme: "blue" // "blue", "black", "white"
};

export const IconMap = {
    'clear sky': sunny,
    'few clouds': mostlySunny,
    'few clouds: 11-25%': mostlySunny,
    'scattered clouds': partlySunny,
    'scattered clouds: 25-50%': partlySunny,
    'broken clouds': mostlyCloudy,
    'broken clouds: 51-84%': mostlyCloudy,
    'overcast clouds': cloudy,
    'overcast clouds: 85-100%': cloudy,
    'shower rain': chanceRain,
    'rain': rain,
    'light thunderstorm': chancetstorms,
    'thunderstorm with light rain': chancetstorms,
    'thunderstorm with light drizzle': chancetstorms,
    'thunderstorm with drizzle': chancetstorms,
    'thunderstorm': tstorms,
    'thunderstorm with rain': tstorms,
    'thunderstorm with heavy rain': tstorms,
    'heavy thunderstorm': tstorms,
    'ragged thunderstorm': tstorms,
    'thunderstorm with heavy drizzle': tstorms,
    'light intensity drizzle': chanceRain,
    'drizzle': chanceRain,
    'heavy intensity drizzle': chanceRain,
    'light intensity drizzle rain': chanceRain,
    'drizzle rain': chanceRain,
    'heavy intensity drizzle rain': chanceRain,
    'shower rain and drizzle': chanceRain,
    'heavy shower rain and drizzle': chanceRain,
    'shower drizzle': chanceRain,
    'light rain': rain,
    'moderate rain': rain,
    'heavy intensity rain': rain,
    'very heavy rain': rain,
    'extreme rain': rain,
    'freezing rain': snow,
    'light intensity shower rain': rain,
    'heavy intensity shower rain': rain,
    'ragged shower rain': rain,
    'light snow': snow,
    'Snow': snow,
    'Heavy snow': snow,
    'Sleet': sleet,
    'Light shower sleet': chanceSleet,
    'Shower sleet': sleet,
    'Light rain and snow': chanceFlurries,
    'Rain and snow': flurries,
    'Light shower snow': snow,
    'Shower snow': snow,
    'Heavy shower snow': snow,
    'Haze': hazy,
    'fog': fog,
    'dust': fog,
    'squalls': wind,
    'tornado': wind,
    'snow': snow,
    'mist': fog,
    notFound: unknown
};

const api_url_ow = `https://api.openweathermap.org/data/2.5/onecall?APPID=${Constants.api_key}&lat=${Constants.latitude}&lon=${Constants.longitude}&units=${Constants.units}`;
const api_url_test = 'http://localhost:8082';

export const api_url = api_url_ow;
