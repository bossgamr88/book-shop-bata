// routes.js
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./authen/isAuthenController')
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
}

