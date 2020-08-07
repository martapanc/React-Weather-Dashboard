import React, {Component} from "react";
import {api_url, Constants, getDegreeSymbol, getWindSpeedSymbol, IconMap} from "./config" ;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            hasAlerts: false,
            alerts: [],
            resp: [],
            currentIcon: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    fetchData = () => {
        fetch(api_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        hasAlerts: true,
                        alerts: ["It's the end of the world as we know it"],
                        resp: result,
                        current: {
                            icon: this.getCurrentIcon(result.current.weather),
                            temp: this.getFormattedTemp(result.current.temp),
                            feelsLike: this.getFormattedTemp(result.current.feels_like),
                            chanceOfRain: this.getChanceOfRain(result.current),
                            windSpeed: this.getFormattedWindSpeed(result.current),
                            windStyle: this.getWindDegStyle(result.current.wind_deg),
                            humidity: result.current.humidity,
                            pressure: result.current.pressure,
                            summary: "Partly cloudy throughout the day. Light rain on Sunday through Thursday.",
                            date: this.getFormattedDate(),
                            time: this.getFormattedTime()
                        }
                    });
                    this.intervalID = setTimeout(this.fetchData.bind(this), Constants.refresh);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    getCurrentIcon(currentWeather) {
        const weatherMainName = currentWeather[0].main;
        if (weatherMainName in IconMap) {
            console.log(weatherMainName);
            return IconMap['weatherMainName'];
        } else {
            return IconMap.notFound;
        }
    }

    getChanceOfRain(current) {
        if ('pop' in current) {
            return current.pop;
        } else {
            return 0;
        }
    }

    getFormattedTemp(temp) {
        return Math.round(temp) + getDegreeSymbol(Constants.units);
    }

    getFormattedWindSpeed(current) {
        return <span>
            {Math.round(current.wind_speed) + getWindSpeedSymbol(Constants.units)}
        </span>
    }

    getWindDegStyle(wind_deg) {
        return {transform: `rotate(${wind_deg}deg)`}
    }

    getFormattedDate() {
        const now = new Date();
        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        return new Intl.DateTimeFormat('en-GB', options).format(now);
    }

    getFormattedTime() {
        const now = new Date();

        const options = {
            hour: 'numeric', minute: 'numeric',
        };
        return new Intl.DateTimeFormat('en-GB', options).format(now);
    }

    render() {
        const {error, isLoaded, resp, alerts, current} = this.state;

        if (error) {
            return <div>Error contacting API</div>
        } else if (!isLoaded) {
            return <div>Fetching results...</div>
        } else
            return <div>
                <div id="alerts" className="marquee">{alerts[0]}</div>
                <table cellSpacing={1}
                       style={{margin: "5px 35px 15px 0px"}}
                >
                    <tr>
                        <td>
                            <img id="currentIcon" src={current.icon} alt="Current icon"/>
                        </td>
                        <td style={{verticalAlign: "middle", whiteSpace: "nowrap"}}>
                            <table className="observations">
                                <tr>
                                    <td id="currentTemp" colSpan="2">{current.temp}</td>
                                    <td className="legend top" style={{paddingLeft: "15px"}}>prob.</td>
                                    <td className="top">
                                        <span style={{float: 'left', marginLeft: '10px'}}>
                                            <span id="currentPrec">{current.chanceOfRain}</span>%
                                        </span>
                                    </td>
                                    <td className="legend top" style={{paddingLeft: "15px"}}>humidity</td>
                                    <td className="top">
                                        <span style={{float: 'left', marginLeft: '10px'}}>
                                            <span id="currentHumidity">{current.humidity}%</span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="apparentTempLabel" className="observations legend bottom">feels like</td>
                                    <td id="currentApparentTemp">{current.feelsLike}</td>
                                    <td id="windLabel" className="observations legend bottom"
                                        style={{paddingLeft: "15px"}}>wind
                                    </td>
                                    <td id="currentWind">
                                        <span className="windContainer">{current.windSpeed}
                                            <span className="wind" style={current.windStyle}>↑</span>
                                        </span>
                                    </td>
                                    <td id="pressureLabel" className="observations legend bottom"
                                        style={{paddingLeft: "15px"}}>pressure
                                    </td>
                                    <td id="currentPressure" className="observations">
                                        <span style={{float: 'left', marginLeft: '10px'}}>{current.pressure} hPa</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td id="currentSummary">{current.summary}</td>
                        <td>
                            <span className="currentDateTime">
                                <span id="currentDate">{current.date}</span><br/>
                                <span id="currentTime">{current.time}</span>
                            </span>
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