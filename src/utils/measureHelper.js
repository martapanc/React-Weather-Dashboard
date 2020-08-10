import React from "react";
import {Units} from "../constants";

export function getDegreeSymbol(unit) {
    switch (unit) {
        case Units.METRIC:
            return '°C';
        case Units.IMPERIAL:
            return '°F';
        case Units.DEFAULT:
        default:
            return 'K';
    }
}

export function getWindSpeedSymbol(unit) {
    switch (unit) {
        case Units.IMPERIAL:
            return ' mph';
        case 'metric_kmh':
            return ' km/h'
        case Units.METRIC:
        case Units.DEFAULT:
        default:
            return ' m/s';
    }
}

export function getWindSpeedInKmh(daily) {
    return <>{Math.round(daily.wind_speed * 3.6)} {getWindSpeedSymbol('metric_kmh')}</>;
}

export function getPercentage(percentage) {
    return Math.round(percentage * 100);
}
