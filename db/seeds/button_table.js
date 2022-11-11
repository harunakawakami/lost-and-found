/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("button_table").del();
  await knex("button_table").insert([
    { id: 1, test: "htmltag" },
    { id: 2, test2: "css" },
  ]);
};
