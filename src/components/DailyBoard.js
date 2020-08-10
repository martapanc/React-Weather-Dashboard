import React, {Component} from "react";
import {Config, IconMap} from "../constants";
import {getDegreeSymbol, getPercentage, getWindSpeedInKmh} from "../utils/measureHelper";

class DailyBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initial: 1,
            limit: 8,
            dailyForecast: this.props.dailyForecast
        }
    }

    getDailyHeaders() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    const dateTime = new Date(parseInt(daily.dt) * 1000);
                    return <th key={i}>
                        {new Intl.DateTimeFormat(Config.locale, {weekday: 'long'}).format(dateTime)}
                    </th>
                }
            )
    }

    getDailyIcons() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    const dailyStatus = daily.weather[0].description;
                    let dailyIcon = IconMap.notFound;
                    if (dailyStatus in IconMap) {
                        dailyIcon = IconMap[dailyStatus];
                    }
                    return <td key={i}><img className="icon" src={dailyIcon} alt="Daily weather icon"/></td>
                }
            )
    }

    getDailySummary() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    const description = daily.weather[0].description;
                    return <td key={i}>{description.charAt(0).toUpperCase() + description.substring(1)}</td>
                }
            )
    }

    getDailyMax() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    return <td key={i}>{Math.round(daily.temp.max)}{getDegreeSymbol(Config.units)}</td>
                }
            )
    }

    getDailyMin() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    return <td key={i}>{Math.round(daily.temp.min)}{getDegreeSymbol(Config.units)}</td>
                }
            )
    }

    getDailyWind() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    return <td key={i}>
                        {getWindSpeedInKmh(daily)}
                        <span className="wind" style={{transform: `rotate(${daily.wind_deg}deg)`}}>↑</span>
                    </td>
                }
            );
    }

    getDailyHumidity() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    return <td key={i}>{daily.humidity}%</td>
                }
            );
    }

    getDailyAccumulation() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    let accumulation = 0;
                    if ('rain' in daily) {
                        accumulation += daily.rain;
                    }
                    if ('snow' in daily) {
                        accumulation += daily.snow
                    }
                    return <td key={i}>{accumulation} mm</td>
                }
            );
    }

    getDailyChanceOfRain() {
        return this.state.dailyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (daily, i) => {
                    let chance = 0;
                    if ('pop' in daily) {
                        chance = getPercentage(daily.pop);
                    }
                    return <td key={i}>{chance}%</td>
                }
            );
    }

    render() {
        return (
            <table id="forecast">
                <thead>
                <tr id="forecastTitles">
                    <th/>
                    {this.getDailyHeaders()}
                </tr>
                </thead>
                <tbody>
                <tr id="forecastIcons">
                    <td/>
                    {this.getDailyIcons()}
                </tr>
                <tr id="forecastSummaries">
                    <td/>
                    {this.getDailySummary()}
                </tr>
                <tr id="forecastMaxTemps">
                    <td><strong>Max temp.</strong></td>
                    {this.getDailyMax()}
                </tr>
                <tr id="forecastMinTemps">
                    <td><strong>Min temp.</strong></td>
                    {this.getDailyMin()}
                </tr>
                <tr id="forecastWind">
                    <td><strong>Wind</strong></td>
                    {this.getDailyWind()}
                </tr>
                <tr id="forecastHumidity">
                    <td><strong>Humidity</strong></td>
                    {this.getDailyHumidity()}
                </tr>
                <tr id="forecastAccumulations">
                    <td><strong>Rain</strong></td>
                    {this.getDailyAccumulation()}
                </tr>
                <tr id="forecastPrecipitations">
                    <td><strong>% of rain</strong></td>
                    {this.getDailyChanceOfRain()}
                </tr>
                </tbody>
            </table>
        )
    }
}

export default DailyBoard;
