const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createTaskSchema, updateTaskSchema } = require('../middleware/validators/taskValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(taskController.getAllTasks));
router.get('/id/:id', auth(), awaitHandlerFactory(taskController.getTaskById)); // localhost:3000/api/v1/tasks/id/1
router.post('/', auth(), createTaskSchema, awaitHandlerFactory(taskController.createTask)); // localhost:3000/api/v1/tasks
router.patch('/id/:id', auth(), updateTaskSchema, awaitHandlerFactory(taskController.updateTask)); // localhost:3000/api/v1/tasks/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(taskController.deleteTask)); // localhost:3000/api/v1/tasks/id/1
router.get('/test', function (req, res) {
    res.send('Hello Task Router');
}
);

module.exports = router;
