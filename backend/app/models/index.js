const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose

db.user = require("./user.role");
db.role = require("./role.model");

db.thread = require("./thread.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;