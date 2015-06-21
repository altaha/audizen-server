var express = require('express'),
    bodyParser = require('body-parser')
    logger = require('morgan')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))

app.get('/', function(req, res, next) {
      res.send('Hello Audizen')
})

app.listen(8080, function(){
      console.log('Express server listening on port 8080')
})
