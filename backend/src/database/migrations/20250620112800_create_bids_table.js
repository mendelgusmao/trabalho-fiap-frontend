exports.up = async function (knex) {
  await knex.schema.createTable("bids", (table) => {
    table.increments("id").primary();
    table.integer("listingId").notNullable();
    table.string("bidder").notNullable();
    table.decimal("value", 10, 2).notNullable();
    table.string("createdAt").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bids");
};
