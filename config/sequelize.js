var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var config = require('./config');

const db = {};

// connect to postgres db
const sequelize = new Sequelize(
    config.postgres.db,
    config.postgres.user,
    config.postgres.password,
    {
        dialect: 'postgres',
        port: config.postgres.port,
        host: config.postgres.host,
    },
);

const modelsDir = path.normalize(`${__dirname}/../models`);

// loop through all files in models directory ignoring hidden files and this file
fs
    .readdirSync(modelsDir)
    .filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
    // import model files and save model names
    .forEach((file) => {
        console.info(`Loading model file ${file}`);
        var model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// calling all the associate function, in order to make the association between the models
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Synchronizing any model changes with database.
sequelize
    .sync()
    .then(() => {
        console.info('Database synchronized');
    })
    .catch((error) => {
        if (error) {
            console.error('An error occured %j', error);
        }
    });
// sequelize.sync().then((err) => {
//     if (err) console.error('An error occured %j', err);
//     else console.info('Database synchronized');
// });

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend(
    {
        sequelize,
        Sequelize,
    },
    db,
);