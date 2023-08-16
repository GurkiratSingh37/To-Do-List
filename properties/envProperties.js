const config = require('config');

exports.port  = process.env.AUTH_PORT || config.get("PORT");
exports.selectedDb = config.get("selectedDb");