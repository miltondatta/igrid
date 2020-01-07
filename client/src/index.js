import App from './App'
import React from 'react'
import './assets/home.css'
import './assets/style.css'
import './assets/login.css'
import './assets/topnav.css'
import './assets/sidenav.css'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
