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

export function getPercentage(percentage) {
    return Math.round(percentage * 100);
}
