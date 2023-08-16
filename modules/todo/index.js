'use strict';

const todoController = require('./controllers/todoController');
const todoValidators = require('./validators/todoValidators');

router.get('/items', todoController.getList);
router.post('/items', todoValidators.createItem, todoController.createItem);
router.put('/items', todoValidators.updateItem, todoController.updateItem);
router.delete('/items', todoValidators.deleteItem, todoController.deleteItem);