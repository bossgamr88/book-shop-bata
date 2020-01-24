const {Comment} = require('../models')

module.exports = {
	// get all comment 

	async index(req,res) {
		try {
			const comments = await Comment.findAll()
			res.send(comments)
		} catch(e) {
			res.status(500).send({
				error : 'Comments information was incorrect'
			})
		}
	},
	// get comment by id
	async show (req,res) {
		try {
			const comment = await Comment.findById(req.params.commentId)
			res.send(comment)
		} catch(error) {
			res.status(500).send({
				error : ' Comment information was incorract'
			})
		}
	},

	// create comment 
	async create(req,res){
		// res.send(JSON.stringify(req.body))
		try {
			const comment = await Comment.create(req.body)
		} catch(error) {
			res.status(500).send({
				error : 'Create comment incorrect'
			})
		}
	},
	// edit comment,suspend , active
	async put(req,res){
		try {
			await Comment.update(req.body,{
				where : {
					id : req.params.commentId
				}
			})
			res.send(req.body)
		} catch(error) {
				res.status(500).send({
				error : 'Update comment incorrect'
			})
		}
	},
	// delete comment 
	async delete(req,res){
		try {
			const comment = await Comment.findOne({
				where : {
					id : req.params.commentId
				}
			})
			if(!comment){
				return res.status(403).send({
					error : 'Comment information was incorract'
				})
			}
			await comment.destroy()
			res.send(comment)
		} catch(error) {
			res.status(500).send({
				error : 'Comment information was incorract'
			})
		}
	}
}

