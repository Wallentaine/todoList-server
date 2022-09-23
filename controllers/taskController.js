const {Task} = require('../models/Task')
const Sequelize = require('sequelize')

const ApiError = require('../error/ApiError')


class TaskController {
    async create(req, res, next) {
        try {
            const {title, text, userId} = req.body

            if (!userId) return next(ApiError.badRequest('Не был передан UserId'))

            const task = await Task.create({title, text, userId})

            if (!task) return next(ApiError.internal("Непредвиденная ошибка!"))

            return res.json(task)

        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.params

            if (!userId) return next(ApiError.badRequest('Не был передан UserId'))

            const tasks = await Task.findAll({where: {userId}, order: [['id', 'ASC']]})

            if (!tasks) return next(ApiError.internal('Что-то пошло не так!'))

            return res.json(tasks)
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async updateOne(req, res, next) {
        try {
            const {id, title, text} = req.body

            if (!id) return next(ApiError.badRequest('Не был передан Id'))

            const exist = await Task.findOne({where: {id}})

            if (!exist) return next(ApiError.notFound('Таска с таким Id не существует'))

            const updatedTask = await Task.update({title, text}, {where: {id}})

            if (!updatedTask) return next(ApiError.internal('Что-то пошло не так!'))

            return res.json(updatedTask)
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async deleteOne(req, res, next) {
        try {
            const {id} = req.body

            if (!id) return next(ApiError.badRequest('Не был передан UserId'))

            const exist = await Task.findOne({where: {id}})

            if (!exist) return next(ApiError.notFound('Таска с таким Id не существует'))

            const deletedTask = await Task.destroy({where: {id}})

            if (!deletedTask) return next(ApiError.internal('Что-то пошло не так!'))

            return res.json(deletedTask)
        } catch (e) {
            next(ApiError.internal(e))
        }
    }
}

module.exports = new TaskController()