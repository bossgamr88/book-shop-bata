// routes.js
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
module.exports = (app) => {
	// RestFul Api for users menagement
	app.get('/users',UserController.index)
	app.get('/user/:userId',UserController.show)
	app.post('/user',UserController.create)
	app.put('/user/:userId',UserController.put)
	app.delete('/user/:userId',UserController.delete)

	app.post('/login',UserAuthenController.login)
}

