import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

import { BrowserRouter } from 'react-router-dom';

import './resources/css/app.css';

import './firebase';

const App = ()=>{
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

