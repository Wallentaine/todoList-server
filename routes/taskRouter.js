const Router = require('express')
const router = new Router()

const TaskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', TaskController.create)
router.get('/', TaskController.getAll)

//router.put('/task')
//router.delete('/task')

module.exports = router