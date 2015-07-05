var express = require('express'),
    fs      = require('fs'),
    path    = require('path'),
    busboy  = require('connect-busboy')({
        limits: { fileSize: 100 * 1024 * 1024 }
    })

var router = express.Router()

var static_file_path = path.dirname(process.mainModule.filename) + '/static/'

audio_files = [
    {'name': 'Recording 1', 'format':'MP3', length: 10},
    {'name': 'Recording 2', 'format':'MP3', length: 10},
    {'name': 'T-Swift', 'format':'FLAC', length: 20},
    {'name': 'Drake', 'format':'FLAC', length: 20},
]

// Routes
router.param('id', function(req, res, next, id) {
    if (id >= audio_files.length || id < 0) {
        next(new Error('Invalid Audio id'))
    } else {
        req.audio = audio_files[id]
        next()
    }
})

router.get('/', function(req, res) {
    res.json({length: audio_files.length})
})
router.get('/:id', function(req, res) {
    res.json(req.audio)
})

router.post('/', busboy,  function(req, res) {
    req.pipe(req.busboy)
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename)
        var fstream = fs.createWriteStream(static_file_path + filename)
        file.pipe(fstream)
        fstream.on('close', function () {
            res.redirect('back')
        })
    })
})

module.exports = router
