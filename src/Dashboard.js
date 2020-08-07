import React, {Component} from "react";
import {api_url, Constants, getDegreeSymbol, getWindSpeedSymbol, IconMap} from "./config" ;
import ScrollingAlerts from "./components/ScrollingAlerts";
import CurrentBoard from "./components/CurrentBoard";

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
        const {error, isLoaded, resp, hasAlerts, alerts, current} = this.state;

        if (error) {
            return <div>Error contacting API</div>
        } else if (!isLoaded) {
            return <div>Fetching results...</div>
        } else
            return <div>
                <ScrollingAlerts hasAlerts={hasAlerts} alerts={alerts}/>
                <CurrentBoard current={current} />
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
