import React, {Component} from "react";
import {api_url, api_url_alerts, Config} from "./constants" ;
import ScrollingAlerts from "./components/ScrollingAlerts";
import CurrentBoard from "./components/CurrentBoard";
import HourlyBoard from "./components/HourlyBoard";
import DailyBoard from "./components/DailyBoard";

const headers = {headers: new Headers({'Authorization': 'Bearer ' + Config.token})};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            hasAlerts: false,
            alertsTitle: null,
            alerts: [],
            current: null,
            hourly: null,
            daily: null
        }
    }

    componentDidMount() {
        this.fetchData();
        this.fetchAlerts();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    fetchData = () => {
        fetch(api_url, headers)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        current: result.current,
                        hourly: result.hourly,
                        daily: result.daily
                    });
                    this.intervalID = setTimeout(this.fetchData.bind(this), Config.refreshRate);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    fetchAlerts = () => {
        fetch(api_url_alerts, headers)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        hasAlerts: result.alerts.length > 0,
                        alerts: this.formatAlerts(result.alerts),
                        alertsTitle: "Alerts for " + result.city_name
                    });
                    this.intervalID = setTimeout(this.fetchData.bind(this), Config.refreshRate);
                }
            )
    }

    formatAlerts(alerts) {
        let alertList = [];
        alerts.forEach((alert) => {
            alertList.push("[" + alert.title + " - " + alert.severity + "] " + alert.description)
        });
        return alertList;
    }

    render() {
        const {error, isLoaded, hasAlerts, alerts, alertsTitle, current, hourly, daily} = this.state;

        if (error) {
            return <div>Error contacting API</div>
        } else if (!isLoaded) {
            return <div>Fetching results...</div>
        } else
            return <div>
                <ScrollingAlerts hasAlerts={hasAlerts} alerts={alerts} alertsTitle={alertsTitle}/>
                <CurrentBoard current={current} daily={daily[0]}/>
                <HourlyBoard hourlyForecast={hourly}/>
                <DailyBoard dailyForecast={daily}/>
            </div>
    }
}

export default Dashboard;
