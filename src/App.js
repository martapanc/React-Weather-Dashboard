import React from 'react';
import './styles/App.scss';
import Dashboard from "./Dashboard";

function App() {
    return (
        <div className="App">
            <Dashboard/>
            <footer>
                <div id="OpenWeather" style={{width: '100%', textAlign: 'center', padding: '20px'}}>
                    Powered by <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
                    OpenWeather
                </a>. Original GUI design by <a
                    href="https://github.com/vlaine/Weather-Forecast-Dashboard/wiki#Options">vlaine</a>
                </div>
            </footer>
        </div>
    );
}

export default App;
