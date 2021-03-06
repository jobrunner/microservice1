const mongojs = require("mongojs");
const config = require("../config");

const db = mongojs(config.dbConnection);
const collection = db.collection(config.settingsCollection)

const settingsService = {
    load: () => {
        return new Promise((resolve, reject) => {
            collection.findOne({ key: "settings" }, (error, settings) => {
                if (error) {
                    reject({error: "Cound not find current settings", errno: 503})
                } else {
                    resolve(settings)
                }
            })
	    })
    },

    save: settings => {
        return new Promise((resolve, reject) => {
            const query = { key: "settings" }
            const options = { upsert: true }
            collection.update(query, {$set: settings}, options, error => {                
                if (error) {
                    reject(error)
                } else {
                    resolve(settings)
                }
            })
	    })
    }
}

module.exports = settingsService