'use strict';

require('./todo');
require('./Register');
require('./login');

app.use(process.env.PATH_ALIAS || '/', router);