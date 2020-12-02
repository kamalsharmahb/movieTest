var { Movies, moviegenere } = require('../config/sequelize');

/**
 * Load selected Movie and append to req.
 */
function load(req, res, next, id) {
    Movies.findOne({ where: { id } })
        .then((movie) => {
            if (!movie) {
                const e = new Error('Movie does not exist');
                e.status = 404;
                return next(e);
            }
            req.movie = movie; 
            return next();
        })
        .catch((e) => next(e));
}

/**
 * Get Movie
 * @returns {Movies}
 */
function get(req, res) {
    return res.json(req.movie);
}

/**
 * Create new movie
 * @property {string} req.body.name - The name of movie.
 * @property {string} req.body.description - Detail description of movie.
 * @property {date} req.body.releaseDate - Release date of movie.
 * @property {integer} req.body.duration - Duration (in minutes) of movie.
 * @property {integer} req.body.rating - Rating of movie on scale of 5.
 * @property {string} req.body.genereId - ID for Genere linked to this movie.
 * @returns {Movies}
 */
function create(req, res, next) {
    const { name, description, releaseDate, duration, rating, generes } = req.body;

    // Validate Input Params
    if (!name) {
      const e = new Error('Movie name cannot be null');
      e.status = 400;
      return next(e);
    }
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(releaseDate))) {
      const e = new Error('validation error for releaseDate. It should be MM/dd/yyyy');
      e.status = 400;
      return next(e);
    }

    if (!Number.isInteger(rating) || rating > 5) {
      const e = new Error('rating should be less than or equal to 5');
      e.status = 400;
      return next(e);
    }

    if (!Number.isInteger(duration)) {
      const e = new Error('Duration should be in minute');
      e.status = 400;
      return next(e);
    }

    if (generes.length === 0) {
      const e = new Error('Atleast one generes must be selected');
      e.status = 400;
      return next(e);
    }

    let savedMovie = {};

    Movies.create({
          name:         name,
          description:  description,
          releaseDate:  releaseDate,
          duration:     duration,
          rating:       rating,
      })
      .then((savedMovies) => {
        savedMovie = savedMovies;
        let movieGenereArr = [];
        for (let i = 0; i < generes.length; i++) {
          movieGenereArr.push({
            movieId: savedMovies.id,
            genereId: generes[i]
          });
          moviegenere.bulkCreate(movieGenereArr);
        }
      })
      .then(() => {
        res.json(savedMovie)
      })
      .catch((e) => next(e));
}

/**
 * Update existing movie
 * @property {string} req.body.name - The name of movie.
 * @property {string} req.body.description - Detail description of movie.
 * @property {date} req.body.releaseDate - Release date of movie.
 * @property {integer} req.body.duration - Duration (in minutes) of movie.
 * @property {integer} req.body.rating - Rating of movie on scale of 5.
 * @returns {Movies}
 */
function update(req, res, next) {
    const { movie } = req;
    const { name, description, releaseDate, duration, rating } = req.body;

    movie.name        = name,
    movie.description = description,
    movie.releaseDate = releaseDate,
    movie.duration    = duration,
    movie.rating      = rating,

    movie.save()
        .then((savedMovies) => res.json(savedMovies))
        .catch((e) => next(e));
}

/**
 * Get movie list.
 * @property {number} req.query.skip - Number of movies to be skipped.
 * @property {number} req.query.limit - Limit number of movies to be returned.
 * @returns {Movies[]}
 */
function list(req, res, next) {
    const { limit = 50 } = req.query;
    Movies.findAll({ limit })
        .then((movies) => res.json(movies))
        .catch((e) => next(e));
}

/**
 * Delete movie.
 * @returns {Movies}
 */
function remove(req, res, next) {
    const { movie } = req;
    const { name } = req.movie;
    movie.destroy()
        .then(() => {
          // delete linked data from genere mapping
          console.log('param - ', req.params.id);
          moviegenere.destroy({ where: { movieId: req.params.id } });
        })
        .then(() => res.json(name))
        .catch((e) => next(e));
}

module.exports = {
    load, get, create, update, list, remove,
};