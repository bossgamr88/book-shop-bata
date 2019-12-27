const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

require('./routes')(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


app.listen(port,()=> console.log(`Server on ${port}`))

