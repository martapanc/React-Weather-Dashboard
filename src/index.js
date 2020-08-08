import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import './styles/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Appearance} from "./constants";

const theme = Appearance.theme;
switch (theme) {
    case "black":
        require(`./styles/theme/black.scss`);
        break;
    case "white":
        require(`./styles/theme/white.scss`);
        break;
    case "blue":
    default:
        require(`./styles/theme/blue.scss`);
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
