require('dotenv').config(); // this is important!
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "mern_passport",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "use_env_variable": "JAWSDB_URL",
      "dialect": "mysql"
    }
}


// https://stackoverflow.com/questions/38757728/using-an-enviroment-variable-for-local-sequelize-configuration
