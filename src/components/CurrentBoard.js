import React, {Component} from "react";

class CurrentBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: this.props.current
        }
    }

    render() {
        const {current} = this.state;

        return <table cellSpacing={1}
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
    }
}

export default CurrentBoard;
