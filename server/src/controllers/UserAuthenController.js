const {User} = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7 
	return jwt.sign(user,config.authentication.jwtSecret,{
		expiresIn : ONE_WEEK
	})
}


module.exports = {
	async register (req,res) {
		try {
			const user = await User.create(req.body)
			res.send(user.toJSON())
		} catch(error) {
			res.status(400).send({
				error : 'The Connect information was incorrect'
			})
		}
	},
	async login (req,res){
		try {
			const {email,password} = req.body
			const user = await User.findOne({
				where : {
					email : email
					// passsword : password
					// status : 'active'
				}
			})

			if(!user){
				return res.status(403).send({
					error : 'User/Password not correct'
				})
			}
			const isPasswordVaild = await user.comparePassword(password)
			if(!isPasswordVaild){
				return res.status(403).send({
					error : 'User/Password not correct'
				})
			}

		// แยกส่วน User Types เพื่อจัดการ Permission 
		// แยกส่วน Login ใน Authen
		// เช็ค user.type ก่อนส่งข้อมูลออกไป
		if(user.type != "admin"){
			return res.status(403).send({
				error : 'Permission not correct'
			})
		}		


	const userJSON = user.toJSON()
	// res.send(userJSON)
	res.send({
		user : userJSON,
		token : jwtSignUser(userJSON)
	})

	} catch (error){
		res.status(500).send({
			error : 'Error! from get user'
		})
	}
	},

	async clientLogin (req,res){
		try {
			const {email,password} = req.body
			const user = await User.findOne({
				where : {
					email : email
				}
			})
		if(!user){
			return res.status(403).send({
				error : 'User/Password not correct'
			})
		}

	const isPasswordVaild = await user.comparePassword(password)
	if(!isPasswordVaild){
		return res.status(403).send({
			error : 'User/Password not correct'
		})
	}

	// dont't check permission type

	const userJSON = user.toJSON()
	// res.send(userJSON)
	res.send({
		user : userJSON,
		token : jwtSignUser(userJSON)
	})

	} catch (error){
		res.status(500).send({
			error : 'Error! from get user'
		})
	}
	},
	
}

