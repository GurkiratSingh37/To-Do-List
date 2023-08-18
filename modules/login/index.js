'use strict';

const loginValidator = require('./validators/loginValidator');
const loginController = require('./controllers/loginController');

router.post('/login', loginValidator.login, loginController.login);