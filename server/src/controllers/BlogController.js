const {Blog} = require('../models')

module.exports = {

	
	// get all blog
	async index (req,res) {
		// try {
		// 	const blogs = await Blog.findAll()
		// 	res.send(blogs)
		// } catch(error) {
		// 	res.status(500).send({
		// 		error : 'Blog Information Error'
		// 	})
		// }

		// index with search blog 
		try {
			let blogs = null
			const search = req.query.search
			// console.log('search key: ' + search)

			 if (search) {
			    blogs = await Blog.findAll({
			      where: {
			        $or: [
			          'title', 'content', 'category'
			        ].map(key => ({
			          [key]: {
			            $like: `%${search}%`,                
			          }
			        })),
			      },
			      order: [['updatedAt', 'DESC']]
			    })
			  } else {
			    blogs = await Blog.findAll({
			      order: [['updatedAt', 'DESC']]
			    })
			  }
			  res.send(blogs)
			} catch (err) {
			  res.status(500).send({
			    error: 'an error has occured trying to fetch the blogs'
			})
		}
	},
	// get blog by id
	async show (req,res) {
		try {
			const blog = await Blog.findById(req.params.blogId)
			res.send(blog)
		} catch(error) {
			res.status(500).send({
				error : ' Blog information was incorract'
			})
		}
	},
	// create blog
	async create(req,res){
		try {
			const blog = await Blog.create(req.body)
			console.log(req.body)
			res.send(blog.toJSON())
		} catch(error) {
            res.status(500).send({
                error : 'Create blog Errors'
            })
		}
	},
	// edit blog , suspend , active
	async put(req,res){
		try {
			await Blog.update(req.body,{
				where : {
					id : req.params.blogId
				}
			})			
			res.send(req.body)
		} catch(error) {
			res.status(500).send({
				error : 'Create blog Errors'
			})
		}
	}, 
	// remove blog
	async delete(req,res){
		try {
			const blog = await Blog.findOne({
				where : {
					id : req.params.blogId
				}
			})
			if(!blog){
				return res.status(403).send({
					error : 'Blog information was incorract'
				})
			}
			await blog.destroy()
			res.send(blog)
		} catch(error) {
			res.status(500).send({
				error : 'Blog information was incorract'
			})
		}
	}
}

