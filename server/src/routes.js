// routes.js
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./authen/isAuthenController')
const BlogController = require('./controllers/BlogController')
const ComentController = require('./controllers/CommentController')

module.exports = (app) => {
	// RestFul Api for users menagement
	app.get('/users',
		isAuthenController,
		UserController.index)
	app.get('/user/:userId',UserController.show)
	app.post('/user',UserController.create)
	app.put('/user/:userId',UserController.put)
	app.delete('/user/:userId',UserController.delete)

	app.post('/login',UserAuthenController.login)

	// blog router
	app.post('/blog',BlogController.create)
	app.put('/blog/:blogId',BlogController.put)
	app.delete('/blog/:blogId',BlogController.delete)
	app.get('/blog/:blogId',BlogController.show)
	app.get('/blogs',BlogController.index)

	// comment route 
	// create comment 
	app.post('/comment',ComentController.create)
	// edit comment , suspend,active
	app.put('/comment/:commentId',ComentController.put)
	// delete comment
	app.delete('/comment/:commentId',ComentController.delete)
	// get comment by id
	app.get('/comment/:commentId',ComentController.show)
	// get all comment 
	app.get('/comments',ComentController.index)
}


