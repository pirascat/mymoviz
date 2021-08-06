var express = require('express');
var router = express.Router();
var request = require('sync-request');
var requeteFilmsPop = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=800b56d82e1163f4f346985b6b888810&language=fr");
var resultFilmsPop = JSON.parse(requeteFilmsPop.body);
var mongoose = require('mongoose');

let MovieModel = require("../models/movies")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tableau: resultFilmsPop });
});

router.get('/new-movies', async function(req, res, next){
  res.json(resultFilmsPop)
})

router.get('/wishlist-beginning', async function(req, res, next){
  const wishList = await MovieModel.find()
  res.json(wishList)
})

router.post('/wishlist-movie', async function(req, res, next){
  let newMovie = new MovieModel({
    name : req.body.name,
    img: req.body.img,
    desc : req.body.desc,
    note: req.body.note,
    note_count: req.body.note_count
  })
  let newMovieSaved = await newMovie.save()
  let data = await MovieModel.find()
  res.json(data)
})

router.delete('/delete-movie/:name', async function(req, res, next){
  let deleteMOvie = await MovieModel.deleteOne({name : req.params.name})
  let data = await MovieModel.find()
  res.json(data)
})

module.exports = router;
