import React, {Component} from "react";


class ScrollingAlerts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasAlerts: this.props.hasAlerts,
            alerts: this.props.alerts,
            alertsTitle: this.props.alertsTitle
        }
    }

    render() {
        const {hasAlerts, alerts, alertsTitle} = this.state;
        return hasAlerts && <div id="alerts" className="marquee"><strong>{alertsTitle}</strong>: {alerts}</div>
    }
}

export default ScrollingAlerts;
