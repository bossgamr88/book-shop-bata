const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const app = express()
const {sequelize} = require('./models')

const port = process.env.PORT || config.port

// เอา middleware ไว้ก่อน router นะ เพราะ 
// ให้มันผ่าน middle ก่อนไป router
// ไม่งั้น routes เราจะใช้ req.body ของ bodyParser ไม่ได้ 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
require('./routes')(app)




sequelize.sync({force:false}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server on ${port}`);
    });
});