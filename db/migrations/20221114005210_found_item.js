const axios = require("axios");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.createTable("found_item", (table) => {
    table.increments("id").primary();
    table.string("item", 255).notNullable();
    table.string("prev_location", 255).notNullable();
    table.string("curr_location", 255).notNullable();
    table.string("coordinates", 255).notNullable();
    table.string("img_url", 255);
    table.string("comment", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return await knex.schema.dropTable("found_item");
};
