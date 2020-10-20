const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  dbConnection: process.env.MONGODB_CONNECTION,
  dbOptions: process.env.MONGODB_OPTIONS || {},
  settingsCollection: process.env.SETTINGS_COLLECTION || "settings",
  port: process.env.PORT || 3000
};