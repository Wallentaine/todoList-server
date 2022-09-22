const {Task} = require('../models/Task')
const Sequelize = require('sequelize')

const ApiError = require('../error/ApiError')


class TaskController {
    async create(req, res, next) {
        try {
            const {title, text, userId} = req.body

            if (!userId) return next(ApiError.notFound('Не был передан UserId'))

            const task = Task.create({title, text, userId})

            if (!task) return next(ApiError.internal("Непредвиденная ошибка!"))

            return res.json(task)

        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.body

            if (!userId) return next(ApiError.notFound('Не был передан UserId'))

            const tasks = await Task.findAll({where: {userId}})

            if (!tasks) return next(ApiError.internal('Что-то пошло не так!'))

            return res.json(tasks)
        } catch (e) {
            next(ApiError.internal(e))
        }
    }
}

module.exports = new TaskController()