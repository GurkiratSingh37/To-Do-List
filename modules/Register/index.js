'use strict';

const regitserValidator = require('./validators/registerValidator');
const registerController = require('./controllers/registerController');

router.post('/register', regitserValidator.register, registerController.register);