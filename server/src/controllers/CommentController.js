/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Comment = require('../models/commentModel')

class CommentController {
    async create(req, res) {
        const comment = req.body
        const max = await Comment.findOne({}).sort({ code: -1 })
        comment.code = max == null ? 1 : max.code + 1
        const result = await Comment.create(comment)
        res.status(201).json(result)
    }

    async list(req, res) {
        const result = await Comment.find({})
        res.status(200).json(result)
    }

    async getById(req, res) {
        const code = req.params.id
        const result = await Comment.findOne({ code })
        res.status(200).json(result)
    }

    async update(req, res) {
        const code = req.params.codigo
        const _id = String((await Comment.findOne({ code }))._id)
    }

    async delete(req, res) {
        const codigo = req.params.codigo
        const _id = String((await Comment.findOne({ codigo }))._id)
        await Comment.findByIdAndRemove(String(_id))
        res.status(200).send()
    }
}

module.exports = new CommentController()
