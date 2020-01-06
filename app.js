// Imports
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
const db = require('./config/db')
const express = require('express')
const UserRouter = require('./routes/users')
const cookieParser = require('cookie-parser')


// Database Connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Initialization
const app = express();


// Middleware
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


// Route Defination
app.use('/api/v1', UserRouter)


module.exports = app;