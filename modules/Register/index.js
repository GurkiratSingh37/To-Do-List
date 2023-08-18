'use strict';

const regitserValidator = require('../Register/validators/registerValidator');
const registerController = require('../Register/controllers/regiterController');

router.post('/register', regitserValidator.register, registerController.register);