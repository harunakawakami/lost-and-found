const knex = require("knex");
const config = require("../knexfile");
require("dotenv").config();

const db =
  process.env.NODE_ENV === "production"
    ? knex(config.production)
    : knex(config.development);

module.exports = db;
