// routes.js
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./authen/isAuthenController')
const BlogController = require('./controllers/BlogController')
const ComentController = require('./controllers/CommentController')
const multer = require('multer')

// upload section 



module.exports = (app) => {

	// upload section 
  let storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./public/uploads");
    },
    filename: function(req, file, callback) {
      // callback(null, file.fieldname + '-' + Date.now());
      console.log(file);
      callback(null, file.originalname);
    }
  })
  let upload = multer({ storage: storage }).array("userPhoto", 10)

  // upload
  app.post("/upload", function(req, res) {
    // isUserAuthenticated,
    upload(req, res, function(err) {
      if (err) {
        return res.end("Error uploading file.");

        }
        res.end("File is uploaded");
      })
  })


  //delete file uploaded function
  app.post('/upload/delete', async function (req, res) {
    try {
      const fs = require('fs');      

      console.log(req.body.filename)
      fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
        if (err) throw err;
        res.send("Delete sucessful")
        // console.log('successfully deleted material file');
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete file the material'
      })
    }
  }),

	// RestFul Api for users menagement
	app.get('/users',
		isAuthenController,
		UserController.index)
	app.get('/user/:userId',UserController.show)
	app.post('/user',UserController.create)
	app.put('/user/:userId',UserController.put)
	app.delete('/user/:userId',UserController.delete)

	app.post('/login',UserAuthenController.login)
  app.post('/front/login',UserAuthenController.clientLogin)

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


