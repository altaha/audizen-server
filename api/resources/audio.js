var express = require('express')

var router = express.Router()

audio_files = [
    {'name': 'Recording 1', 'format':'MP3', length: 10},
    {'name': 'Recording 2', 'format':'MP3', length: 10},
    {'name': 'T-Swift', 'format':'FLAC', length: 20},
    {'name': 'Drake', 'format':'FLAC', length: 20},
]

router.param('id', function(req, res, next, id) {
    if (id >= audio_files.length || id < 0) {
        next(new Error('Invalid Audio id'))
    } else {
        req.audio = audio_files[id]
        next()
    }
});

router.get('/audio/:id', function(req, res) {
    res.json(req.audio)
});

module.exports = router
