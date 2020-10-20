const express = require("express")
const config = require("./config")

const app = express()
app.use(express.json())

// Communication between frontend and microservice1 is not on the same origin.
// So an simple hack is to modifiy the cors headers
app.use(require("./routes/cors"))

// Handles the webhook configurations
app.use('/settings', require('./routes/settings'))

// Handles the chat messages
app.use('/message', require('./routes/message'))

// Prevents gruslige html error pages on other that defined requests to this service.
app.use(require("./routes/default"))

// Microservice 1 listens per default on port configures in ./config.js
// Please create an .evn file like the .env.example file to modifie this.
app.listen(config.port, () => {
	console.log("Server running on port " + config.port)
}).on('error', error => {
    console.log(error)
    process.exit(1);
})