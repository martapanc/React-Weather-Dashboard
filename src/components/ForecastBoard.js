import React, {Component} from "react";

class ForecastBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
        )
    }
}

export default ForecastBoard;
