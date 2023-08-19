const config = require('config');

exports.port  = process.env.AUTH_PORT || config.get("PORT");
exports.selectedDb = config.get("selectedDb");

exports.mailHost = config.get('mailSettings.host');
exports.mailPort = config.get('mailSettings.port');
exports.mailUser = config.get('mailSettings.auth.user');
exports.mailPass = config.get('mailSettings.auth.pass');
exports.mailFrom = config.get('mailSettings.from');
