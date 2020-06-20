const TodoController = require('./routes/controller/todolistController');

module.exports = function(app) {
    app.get('/api/getAllList', TodoController.getAllList);
    app.post('/api/addItem', TodoController.addItem);
    app.post('/api/deleteItem', TodoController.deleteItem);
    app.post('/api/updateItem', TodoController.updateItem);
}