var express = require('express');
var router = express.Router();
var {Movies} = require('../config/sequelize');

/* GET Movies listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function(req, res, next) {
  console.log(' ALL data ');
  Movies.findAll()
      .then( movies => {
          res.status(200).send(JSON.stringify(movies));
      })
      .catch( err => {
          res.status(500).send(JSON.stringify(err));
      });
});

router.get('/:id', function(req, res, next) {
  Movies.findByPk(req.params.id)
      .then( movie => {
          res.status(200).send(JSON.stringify(movie));
      })
      .catch( err => {
          res.status(500).send(JSON.stringify(err));
      });
});

router.put('/', function(req, res, next) {
  Movies.create({
        name: req.body.name,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        duration: req.body.duration,
        rating: req.body.rating
      })
      .then( movie => {
          res.status(200).send(JSON.stringify(movie));
      })
      .catch( err => {
          res.status(500).send(JSON.stringify(err));
      });
});

router.delete('/:id', function(req, res, next) {
  Movies.destroy({
      where: {
          id: req.params.id
      }
      })
      .then( () => {
          res.status(200).send();
      })
      .catch( err => {
          res.status(500).send(JSON.stringify(err));
      });
});

module.exports = router;
