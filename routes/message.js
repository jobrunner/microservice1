const router = require("express").Router()
const messageService = require("../services/message-service")

router.post("/" , (request, response, next) => {
    const data = request.body.message
    messageService.sendMessage(data)
        .then(message => {
            response.json(message)
	    }, statusCode => {
		    response.sendStatus(statusCode)
        });
})

module.exports = router