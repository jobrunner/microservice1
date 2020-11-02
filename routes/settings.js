const router = require("express").Router()
const { response } = require("express")
const settingsService = require("../services/settings-service")

router.get("/", (request, response, next) => {
	settingsService.load().then(settings => {
		response.json(settings)
	}, (error) => {
		console.log(error)
		response.sendStatus(error.errno || 400)
    })
})

router.post("/", (request, response, next) => {
	const data = request.body
	settingsService.save(data).then(settings => {
		response.json(settings)
	}, (error) => {
		console.log(error)
		response.sendStatus(error.errno || 400)
	});	
});

module.exports = router