
const todoController = require('./controllers/todoController');
const todoValidators = require('./validators/todoValidators');

router.get('/items', 
// todoValidators.getList, 
todoController.getList);
router.post('/items', todoController.createItem);
router.put('/items', todoController.updateItem);
router.delete('/items', todoController.deleteItem);