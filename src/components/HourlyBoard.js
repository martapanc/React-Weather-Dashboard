import React, {Component} from "react";
import {Config, IconMap} from "../constants";
import {getDegreeSymbol, getPercentage, getWindSpeedSymbol} from "../utils/measureHelper";

class HourlyBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 18,
            initial: 1,
            hourlyForecast: this.props.hourlyForecast
        }
    }

    getHourHeaders() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (hourly, i) => {
                    let dateTime = new Date(parseInt(hourly.dt) * 1000);
                    return <th key={i}>{dateTime.getHours()}h</th>
                }
            );
    }

    getHourlyIcons() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (hourly, i) => {
                    const hourlyStatus = hourly.weather[0].description;
                    let hourlyIcon = IconMap.notFound;
                    if (hourlyStatus in IconMap) {
                        hourlyIcon = IconMap[hourlyStatus];
                    }
                    return <td key={i}><img className="icon" src={hourlyIcon} alt="Hourly weather icon"/></td>
                }
            );
    }

    getHourlyTemperatures() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (hourly, i) => {
                    return <td key={i}>
                        {Math.round(hourly.temp)} {getDegreeSymbol(Config.units)}
                    </td>
                }
            );
    }

    getHourlyWind() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (hourly, i) => {
                    return <td key={i}>
                        {Math.round(hourly.wind_speed)} {getWindSpeedSymbol(Config.units)}
                        <span className="wind" style={{transform: `rotate(${hourly.wind_deg}deg)`}}>↑</span>
                    </td>
                }
            );
    }

    getHourlyHumidity() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (hourly, i) => {
                    return <td key={i}>{hourly.humidity}%</td>
                }
            );
    }

    getHourlyAccumulation() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (hourly, i) => {
                    let accumulation = 0;
                    if ('rain' in hourly) {
                        accumulation += hourly.rain['1h'];
                    }
                    if ('snow' in hourly) {
                        accumulation += hourly.snow['1h'];
                    }
                    return <td key={i}>{accumulation} mm</td>
                }
            );
    }

    getHourlyChanceOfRain() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                (hourly, i) => {
                    let chance = 0;
                    if ('pop' in hourly) {
                        chance = getPercentage(hourly.pop);
                    }
                    return <td key={i}>{chance}%</td>
                }
            );
    }

    render() {
        return (
            <table id="tableHourlyForecast" cellSpacing="0">
                <thead>
                <tr id="hourlyHours">
                    <th/>
                    {this.getHourHeaders()}
                </tr>
                </thead>
                <tbody>
                <tr id="hourlyIcons">
                    <td/>
                    {this.getHourlyIcons()}
                </tr>
                <tr id="hourlyTemp">
                    <td><strong>Temp.</strong></td>
                    {this.getHourlyTemperatures()}</tr>
                <tr id="hourlyWind">
                    <td><strong>Wind</strong></td>
                    {this.getHourlyWind()}
                </tr>
                <tr id="hourlyHumidity">
                    <td><strong>Humidity</strong></td>
                    {this.getHourlyHumidity()}
                </tr>
                <tr id="hourlyAcc">
                    <td><strong>Rain</strong></td>
                    {this.getHourlyAccumulation()}
                </tr>
                <tr id="hourlyPrec">
                    <td><strong>% of rain</strong></td>
                    {this.getHourlyChanceOfRain()}
                </tr>
                </tbody>
            </table>
        )
    }
}

export default HourlyBoard;
