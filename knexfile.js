require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL_LOCAL,
    // user: process.env.USERNAME,
    // password: process.env.PASSWORD,
    searchPath: "public",

    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  production: {
    development: {
      client: "pg",
      connection: process.env.DB_URL,
      // user: process.env.USERNAME,
      // password: process.env.PASSWORD,
      searchPath: "public",

      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: __dirname + "/db/migrations",
        tableName: "knex_migrations",
      },
      seeds: {
        directory: __dirname + "/db/seeds",
      },
    },
  },
};
