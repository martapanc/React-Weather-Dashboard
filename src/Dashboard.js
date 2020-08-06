import React, {Component} from "react";
import {api_url} from "./config" ;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            resp: []
        }
    }

    componentDidMount() {
        fetch(api_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        resp: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, resp} = this.state;

        if (error) {
            return <div>Error contacting API</div>
        } else if (!isLoaded) {
            return <div>Fetching results...</div>
        } else
            return <div>
                <div id="alerts" className="marquee"/>
                <table id="header" cellSpacing="20">
                    <tr>
                        <td><i id="currentIcon"></i></td>
                        <td>
                            <table className="observations">
                                <tr>
                                    <td id="currentTemp" colSpan="2"></td>
                                    <td className="legend top">prob.</td>
                                    <td className="top"><span id="currentPrec"></span>%</td>
                                </tr>
                                <tr>
                                    <td id="apparentTempLabel" className="observations legend bottom"></td>
                                    <td id="currentApparentTemp"></td>
                                    <td id="windLabel" className="observations legend bottom"></td>
                                    <td id="currentWind"></td>
                                    <td id="humidityLabel" className="observations legend bottom">rh
                                    </td>
                                    <td id="currentHumidity"></td>
                                </tr>
                            </table>
                        </td>
                        <td id="currentSummary"></td>
                        <td className="currentDateTime">
                            <span id="currentDate"></span><br/>
                            <span id="currentTime"></span>
                        </td>
                    </tr>
                </table>
                <table id="tableHourlyForecast" cellSpacing="0">
                    <tr id="hourlyHours"></tr>
                    <tr id="hourlyIcons"></tr>
                    <tr id="hourlyTemp"></tr>
                    <tr id="hourlyWind"></tr>
                    <tr id="hourlyHumidity"></tr>
                    <tr id="hourlyAcc"></tr>
                    <tr id="hourlyPrec"></tr>
                </table>
                <table id="forecast">
                    <tr id="forecastTitles"></tr>
                    <tr id="forecastIcons"></tr>
                    <tr id="forecastSummaries"></tr>
                    <tr id="forecastMaxTemps"></tr>
                    <tr id="forecastMinTemps"></tr>
                    <tr id="forecastWind"></tr>
                    <tr id="forecastHumidity"></tr>
                    <tr id="forecastAccumulations"></tr>
                    <tr id="forecastPrecipitations"></tr>
                </table>
            </div>
    }
}

export default Dashboard;
