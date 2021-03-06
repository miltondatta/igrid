import App from './App'
import React from 'react'
import './assets/home.css'
import './assets/login.css'
import './assets/topnav.css'
import './assets/sidenav.css'
import './assets/report.css'
import './assets/dataTable.css'
import './assets/document.css'
import './assets/misReport.css'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import './assets/style.css'
import './assets/responsive.css'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
