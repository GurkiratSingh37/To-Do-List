'use strict';

const todoController = require('./controllers/todoController');
const todoValidators = require('./validators/todoValidators');

const authValidator = require('../../validators/authValidator');
const userAuth = authValidator.authenticateUser;

router.get('/items', todoValidators.getList, userAuth, todoController.getList);
router.post('/items', todoValidators.createItem, userAuth, todoController.createItem);
router.put('/items', todoValidators.updateItem, userAuth, todoController.updateItem);
router.delete('/items', todoValidators.deleteItem, userAuth, todoController.deleteItem);