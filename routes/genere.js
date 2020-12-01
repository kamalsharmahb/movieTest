var express = require('express');
var router = express.Router();
var GenereCtrl = require('../controllers/genere.controller');

router
    .route('/')

    /** GET /api/users - Get list of users */
    .get(GenereCtrl.list)

    /** POST /api/users - Create new user */
    .post(GenereCtrl.create);

module.exports = router;
