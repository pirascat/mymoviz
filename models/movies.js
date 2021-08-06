let mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    desc: String,
    img: String,
    name: String,
    note: Number,
    note_count: Number
    })

let MovieModel = mongoose.model('movies', movieSchema)

module.exports = MovieModel