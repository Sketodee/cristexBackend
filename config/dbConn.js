const mongoose = require ('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
            socketTimeoutMS: 60000, // Close sockets after 45 seconds of inactivity
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB