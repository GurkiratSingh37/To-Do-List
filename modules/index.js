'use strict';

require('./todo');
require('./register');
require('./login');

app.use(process.env.PATH_ALIAS || '/', router);