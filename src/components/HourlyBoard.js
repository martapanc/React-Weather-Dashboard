import React, {Component} from "react";
import {Constants, IconMap} from "../config";
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
                hourly => {
                    let dateTime = new Date(parseInt(hourly.dt) * 1000);
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
                    return <td>{accumulation} mm</td>
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
                    <th/>
                    {this.getHourHeaders()}
                </tr>
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
            </table>
        )
    }
}

export default HourlyBoard;
