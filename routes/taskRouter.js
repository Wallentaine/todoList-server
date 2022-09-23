const Router = require('express')
const router = new Router()

const TaskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, TaskController.create)
router.get('/:userId', authMiddleware, TaskController.getAll)
router.put('/', authMiddleware, TaskController.updateOne)
router.delete('/', authMiddleware, TaskController.deleteOne)

module.exports = router