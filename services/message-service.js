// An even better way of doing the service would be using a 
// repository pattern. Here, testing with mocking the requests 
// to a "microservice2" and mongodb is neither usefull nor maintainable.
const settingsService = require("./settings-service")
const axios = require("axios").default

function configureRequest(webhook) {
    return { 
        baseURL: webhook.url,
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": webhook.secret
        }
    }
}   

function resolveStatusCode(error) {
    if (["EPROTO", "ENOTFOUND", "ECONNREFUSED"].includes(error.code)) {
        // Whether schema, hostname or port produces the error we use here 421 - Misdirected Request
        return 421
    } else {
        // Whether e.g. a 403 (Forbidden) or other. Defaults to 400 - Bad Request
        return error.response.status || 400
    }
}

const messageService = {
    sendMessage: (message) => {
        return new Promise((resolve, reject) => {            
            // The bottleneck (every message reads config for microservice2)
            settingsService.load()
                .then(settings => {
                    const config = configureRequest(settings.webhook)
                    const httpClient = axios.create(config)

                    return httpClient.post("/message", {message: message})
                }, error => {
                    // pass an error
                    reject(error)
                })
                .then(response => {
                    // Seems all ok
                    resolve({message: response.data})
                }, error => {
                    const statusCode = resolveStatusCode(error)
                    reject(statusCode)
                })
            })
    }
}

module.exports = messageService