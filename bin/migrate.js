var {sequelize} = require('../config/sequelize');
sequelize.sync({ force: true });