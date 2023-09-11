'use strict';

const loginValidator = require('./validators/loginValidator');
const loginController = require('./controllers/loginController');

router.post('/user/loginWithPassword', loginValidator.loginWithPassword, loginController.loginWithPassword);

roouter.post('/user/sendOtp', loginValidator.sendOtp, loginController.sendOtp);