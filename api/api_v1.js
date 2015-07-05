var express = require('express'),
    audio_route = require('./resources/audio')

var router = express.Router()
var api_root = '/api/v1'


router.use(api_root + '/audio', audio_route)


module.exports = router
