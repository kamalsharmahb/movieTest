var { Genere } = require('../config/sequelize');

/**
 * Create new Genere
 * @property {string} req.body.Name - The Name of genere.
 * @property {string} req.body.Description - Details descrtiption about Genere.
 * @returns {Genere}
 */
function create(req, res, next) {
    const { Name, Description } = req.body;
    const genere = Genere.build({
        Name: Name,
        Description: Description
    });

    genere.save()
        .then((savedGenere) => res.json(savedGenere))
        .catch((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Genere[]}
 */
function list(req, res, next) {
    const { limit = 50 } = req.query;
    Genere.findAll({ limit })
        .then((users) => res.json(users))
        .catch((e) => next(e));
}

module.exports = {
    create, list,
};