if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { urlencoded } = require('express')
const express = require('express')
const { errorHandler } = require('./middlewares/error_handler')
const router = require('./routes')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandler)
module.exports = app