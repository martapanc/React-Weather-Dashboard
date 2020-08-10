import React, {Component} from "react";
import {api_url, Config} from "./constants" ;
import ScrollingAlerts from "./components/ScrollingAlerts";
import CurrentBoard from "./components/CurrentBoard";
import HourlyBoard from "./components/HourlyBoard";
import DailyBoard from "./components/DailyBoard";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            hasAlerts: false,
            alerts: [],
            current: null,
            hourly: null,
            daily: null
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

    render() {
        const {error, isLoaded, hasAlerts, alerts, current, hourly, daily} = this.state;

        if (error) {
            return <div>Error contacting API</div>
        } else if (!isLoaded) {
            return <div>Fetching results...</div>
        } else
            return <div>
                <ScrollingAlerts hasAlerts={hasAlerts} alerts={alerts}/>
                <CurrentBoard current={current} daily={daily[0]}/>
                <HourlyBoard hourlyForecast={hourly}/>
                <DailyBoard dailyForecast={daily}/>
            </div>
    }
}

export default Dashboard;
