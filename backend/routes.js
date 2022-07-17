const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const auth = require('./middlewares/auth');

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.get('/logout', auth, authController.logout);

//task
router.post('/add-task', auth, taskController.task)
router.get('/tasks', auth, taskController.tasks)
router.delete('/delete/:id', auth, taskController.delete)
router.put('/edit/:id', auth, taskController.edit)
module.exports = router;