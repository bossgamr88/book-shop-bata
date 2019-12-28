const {User} = require('../models')

module.exports = {
	// get all user
	async index (req,res) {
		try {
			const users = await User.findAll()
			res.send(users)
		} catch(error) {
			res.status(500).send({
				error : 'User Information Error'
			})
		}
	},
	// get user by id
	async show (req,res) {
		try {
			const user = await User.findById(req.params.userId)
			res.send(user)
		} catch(error) {
			res.status(500).send({
				error : ' User information was incorract'
			})
		}
	},
	// create user
	async create(req,res){
		try {
			const user = await User.create(req.body)
			console.log(req.body)
			res.send(user.toJSON())
		} catch(error) {
            res.status(500).send({
                error : 'Create user Errors'
            })
		}
	},
	// edit user
	async put(req,res){
		try {
			await User.update(req.body,{
				where : {
					id : req.params.userId
				}
			})			
			res.send(req.body)
		} catch(error) {
			res.status(500).send({
				error : 'Create user Errors'
			})
		}
	}, 
	// remove user
	async delete(req,res){
		try {
			const user = await User.findOne({
				where : {
					id : req.params.userId
				}
			})
			if(!user){
				return res.status(403).send({
					error : 'User information was incorract'
				})
			}
			await user.destroy()
			res.send(user)
		} catch(error) {
			res.status(500).send({
				error : 'User information was incorract'
			})
		}
	}
}

