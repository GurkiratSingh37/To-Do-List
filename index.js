const express                     = require('express');
const router                      = express.Router();
const app                         = express();

global.app                        = app;
global.router                     = router;

require('./middlewares')
require('./modules');
require('./startup').initializeServer();

module.exports = router;
module.exports = app;
