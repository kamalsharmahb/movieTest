// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    postgres: {
        db: process.env.PG_DB,
        port: process.env.PG_PORT,
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    },
};

module.exports = config;