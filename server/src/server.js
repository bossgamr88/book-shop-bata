const express = require('express')
const bodyParser = require('body-parser')
const {sequelize} = require('./models')
const cors = require('cors')
const config = require('./config/config')
const app = express()


const port = process.env.PORT || config.port

// เอา middleware ไว้ก่อน router นะ เพราะ 
// ให้มันผ่าน middle ก่อนไป router
// ไม่งั้น routes เราจะใช้ req.body ของ bodyParser ไม่ได้ 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
require('./userPassport')
require('./routes')(app)


app.use('/assets', express.static('public'))

// ถ้า force เป็น ture มันจะ reset (clear) ข้อมูลเป็น 0 ทุกครั้ง 
sequelize.sync({force:false}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server on ${port}`);
    });
});