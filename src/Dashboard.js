import React, {Component} from "react";
import {api_url, Constants} from "./config" ;
import ScrollingAlerts from "./components/ScrollingAlerts";
import CurrentBoard from "./components/CurrentBoard";
import HourlyBoard from "./components/HourlyBoard";
import ForecastBoard from "./components/ForecastBoard";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            hasAlerts: false,
            alerts: [],
            resp: [],
            current: null,
            hourly: null
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
                        current: result.current,
                        hourly: result.hourly
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

    render() {
        const {error, isLoaded, resp, hasAlerts, alerts, current, hourly} = this.state;

        if (error) {
            return <div>Error contacting API</div>
        } else if (!isLoaded) {
            return <div>Fetching results...</div>
        } else
            return <div>
                <ScrollingAlerts hasAlerts={hasAlerts} alerts={alerts}/>
                <CurrentBoard current={current}/>
                <HourlyBoard hourlyForecast={hourly}/>
                <ForecastBoard/>
            </div>
    }
}

export default Dashboard;
