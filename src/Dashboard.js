import React, {Component} from "react";
import {api_url} from "./config" ;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            hasAlerts: false,
            alerts: [],
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
                        hasAlerts: true,
                        alerts: ["It's the end of the world as we know it"],
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

    showAlerts(alerts) {

        if (alerts != null && alerts.length > 0) {

            let alertMessages = [];
            // alerts.each(alerts, function (index, alert) {
            //     alertMessages.push(alert.title + ": " + alert.description);
            // });

            // divAlerts.text(alertMessages.join(" | "));
            // divAlerts.show();
        }
        else {
            // divAlerts.hide();
        }
    }

    render() {
        const {error, isLoaded, resp} = this.state;

        if (error) {
            return <div>Error contacting API</div>
        } else if (!isLoaded) {
            return <div>Fetching results...</div>
        } else
            return <div>
                <div id="alerts" className="marquee">{this.state.alerts[0]}</div>
                <table id="header" cellSpacing="20" style={{margin: "-30px -10px -40px -30px"}}>
                    <tr>
                        <td><i id="currentIcon"></i></td>
                        <td style={{"vertical-align": "middle", "white-space": "nowrap"}}>
                            <table className="observations">
                                <tr>
                                    <td id="currentTemp" colSpan="2"></td>
                                    <td className="legend top" style={{"padding-left": "15px"}}>prob.</td>
                                    <td className="top"><span id="currentPrec"></span>%</td>
                                </tr>
                                <tr>
                                    <td id="apparentTempLabel" className="observations legend bottom"></td>
                                    <td id="currentApparentTemp"></td>
                                    <td id="windLabel" className="observations legend bottom"
                                        style={{"padding-left": "15px"}}></td>
                                    <td id="currentWind"></td>
                                    <td id="humidityLabel" className="observations legend bottom"
                                        style={{
                                            "padding-left": "15px",
                                            "padding-right": "5px",
                                            "text-align": "right"
                                        }}>rh
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
