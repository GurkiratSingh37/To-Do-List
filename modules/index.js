'use strict';

require('./todo')

app.use(process.env.PATH_ALIAS || '/', router);