const express = require ('express')
const app = express()
const PORT = process.env.port || 3000


//listen to port 
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))