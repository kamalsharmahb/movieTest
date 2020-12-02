var express = require('express');
var GenereCtrl = require('../controllers/genere.controller');

var router = express.Router();

router
    .route('/')

    /** GET /genere - Get list of all Generes */
    .get(GenereCtrl.list)

    /** POST /genere - Create new Genere */
    .post(GenereCtrl.create);

module.exports = router;
