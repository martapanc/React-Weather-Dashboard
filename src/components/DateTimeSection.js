import React, {Component} from "react";
import {Constants} from "../config";

class DateTimeSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateTime: new Date()
        };
        this.intervalId = null;
    }

    componentDidMount() {
        this.updateCalendar();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    updateCalendar() {
        setInterval(() => this.setState(
            {dateTime: new Date()}
        ), 60000);
    }

    getFormattedDate(dateTime) {
        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        return new Intl.DateTimeFormat(Constants.locale, options).format(dateTime);
    }

    getFormattedTime(dateTime) {
        const options = {
            hour: 'numeric', minute: 'numeric',
        };
        return new Intl.DateTimeFormat(Constants.locale, options).format(dateTime);
    }

    render() {
        const {dateTime} = this.state;
        return (
            <span className="currentDateTime">
                <span id="currentDate">{this.getFormattedDate(dateTime)}</span><br/>
                <span id="currentTime">{this.getFormattedTime(dateTime)}</span>
            </span>
        )
    }
}

export default DateTimeSection;
