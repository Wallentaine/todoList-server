require('dotenv').config()

const express = require('express')
const sequelize = require('./db')

const models = require('./models/connection')

const router = require('./routes/index')

const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

const errorHandler = require('./middleware/errorHandlingMiddleware')

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}

start().then(() => {
    console.log(`SERVER STARTED ON PORT ${PORT}`)
})