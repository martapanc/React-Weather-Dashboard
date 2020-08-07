import React, {Component} from "react";


class ScrollingAlerts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasAlerts: this.props.hasAlerts,
            alerts: this.props.alerts
        }
    }

    render() {
        const {hasAlerts, alerts} = this.state;
        return hasAlerts && <div id="alerts" className="marquee">{alerts[0]}</div>
    }
}

export default ScrollingAlerts;
