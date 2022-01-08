
const DB_NAME = 'note-app';
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_URI = `${URI}/${DB_NAME}`;
const API_URL = process.env.API_URL

module.exports.dbName = DB_NAME;
module.exports.db = DB_URI;
module.exports.apiUrl = API_URL;