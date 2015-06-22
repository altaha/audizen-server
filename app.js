var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan')
var apis = require('./api/api_v1')

var port = process.env.PORT || 8080

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.engine('html', require('ejs').renderFile);

// API Endpoints
app.use('/', apis)

// Web URLs
app.get('/', function(req, res, next) {
    res.render('index.html')
})

// Serve static files
app.use('/static', express.static('static'));

app.listen(port, function(){
    console.log('Express server listening on port ' + port)
})
