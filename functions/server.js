require('dotenv').config()
const express = require ('express')
const serverless = require("serverless-http");
const app = express()
const router = express.Router();
const cors = require('cors')
const corsOptions = require ('../config/corsOptions')
const {logger} = require ('../middleware/logEvents')
const credentials = require('../middleware/credentials')
const errorHandler = require ('../middleware/errorHandler')
const mongoose = require('mongoose')
const connectDB = require('../config/dbConn')
const PORT = process.env.port || 3900


//connect to MongoDb
connectDB()

//custom middleware to log all requests and their origin 
app.use(logger)

//handle options credentials check - before CORS and fetch cookies credential requirements 
 app.use(credentials)

//apply middleware for CORS options 
app.use(cors(corsOptions))

//middleware to handle url encoed data 
app.use(express.urlencoded({extended: false}))

//middleware for json 
app.use(express.json())

//Route handlers without JWT authorization 
app.use('/api/test', require('./routes/api/test'))
app.use('/api/order', require('./routes/api/order'))

//custom error handler 
app.use(errorHandler)

app.use("/.netlify/functions/server", router);

//listen to port
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
})

module.exports.handler = serverless(app);