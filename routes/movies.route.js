var express = require('express');
var MoviesCtrl = require('../controllers/movies.controller');

var router = express.Router();

router
    .route('/')

    /** GET /movies - Get list of all Movies */
    .get(MoviesCtrl.list)

    /** POST /movies - Create new Movie and linked Genere mapping */
    .post(MoviesCtrl.create);

router
    .route('/:id')

    /** GET /movies/:id - Get user */
    .get(MoviesCtrl.get)

    /** PUT /movies/:id - Update user */
    .put(MoviesCtrl.update)

    /** DELETE /movies/:id - Delete user */
    .delete(MoviesCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', MoviesCtrl.load);

module.exports = router;