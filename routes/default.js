const router = require("express").Router()

router.use((request, response, next) => {
    response.sendStatus(404);
})

module.exports = router
