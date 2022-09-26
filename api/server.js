const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

//init Mongo DB connection
connectDB()

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(errorHandler)
//routes
app.use('/api/auth', require('./routes/authRoutes.js'))
app.use('/api/users', require('./routes/userRoutes.js'))


app.listen(port, () => console.log(`Server started at port ${port}`))
