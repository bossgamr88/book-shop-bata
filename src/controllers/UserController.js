module.exports = {
	// get all user
	index (req,res) {
		res.send('get all user')
	},
	// get user by id
	show (req,res) {
		res.send('get user' + req.params.userId)
	},
	// create user
	create(req,res){
		res.send('create ' + JSON.stringify(req.body))
	},
	// edit user
	put(req,res){
		res.send(req.params.userId + ' : ' + JSON.stringify(req.body) )
	}, 
	// remove user
	delete(req,res){
		res.send(req.params)
	}
}