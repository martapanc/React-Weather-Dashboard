import React, {Component} from "react";
import {Constants, IconMap} from "../config";
import {getDegreeSymbol, getPercentage, getWindSpeedSymbol} from "../utils/measureHelper";

class HourlyBoard extends Component {
    constructor(props) {
        super(props);
        const hourlyForecast = this.props.hourlyForecast;

        this.state = {
            limit: 17,
            initial: 1,
            hourlyForecast: hourlyForecast
        }
    }

    getHourHeaders() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                hourly => {
                    let dateTime = new Date(0);
                    dateTime.setSeconds(hourly.dt);
                    return <th>{dateTime.getHours()}h</th>
                }
            );
    }

    getHourlyIcons() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                hourly => {
                    const hourlyStatus = hourly.weather[0].description;
                    let hourlyIcon = IconMap.notFound;
                    console.log(hourly.weather);
                    if (hourlyStatus in IconMap) {
                        hourlyIcon = IconMap[hourlyStatus];
                    }
                    return <td><img className="icon" src={hourlyIcon} alt="Hourly weather icon"/></td>
                }
            );
    }

    getHourlyTemperatures() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                hourly => {
                    return <td>
                        {Math.round(hourly.temp)} {getDegreeSymbol(Constants.units)}
                    </td>
                }
            );
    }

    getHourlyWind() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                hourly => {
                    return <td>
                        {Math.round(hourly.wind_speed)} {getWindSpeedSymbol(Constants.units)}
                        <span className="wind" style={{transform: `rotate(${hourly.wind_deg}deg)`}}>↑</span>
                    </td>
                }
            );
    }

    getHourlyHumidity() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                hourly => {
                    return <td>{hourly.humidity}%</td>
                }
            );
    }

    getHourlyAccumulation() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                hourly => {
                    let accumulation = 0;
                    if ('rain' in hourly) {
                        accumulation += hourly.rain;
                    }
                    if ('snow' in hourly) {
                        accumulation += hourly.snow
                    }
                    return <td>{accumulation}mm</td>
                }
            );
    }

    getHourlyChanceOfRain() {
        return this.state.hourlyForecast
            .slice(this.state.initial, this.state.limit)
            .map(
                hourly => {
                    let chance = 0;
                    if ('pop' in hourly) {
                        chance = getPercentage(hourly.pop);
                    }
                    return <td>{chance}%</td>
                }
            );
    }

    render() {
        return (
            <table id="tableHourlyForecast" cellSpacing="0">
                <tr id="hourlyHours">
                    {this.getHourHeaders()}
                </tr>
                <tr id="hourlyIcons">{this.getHourlyIcons()}</tr>
                <tr id="hourlyTemp">{this.getHourlyTemperatures()}</tr>
                <tr id="hourlyWind">{this.getHourlyWind()}</tr>
                <tr id="hourlyHumidity">{this.getHourlyHumidity()}</tr>
                <tr id="hourlyAcc">{this.getHourlyAccumulation()}</tr>
                <tr id="hourlyPrec">{this.getHourlyChanceOfRain()}</tr>
            </table>
        )
    }
}

export default HourlyBoard;
