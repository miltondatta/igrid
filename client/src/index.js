import App from './App'
import React from 'react'
import './assets/home.css'
import './assets/login.css'
import './assets/topnav.css'
import './assets/sidenav.css'
import './assets/dataTable.css'
import ReactDOM from 'react-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BrowserRouter} from 'react-router-dom'

import './assets/style.css'
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
