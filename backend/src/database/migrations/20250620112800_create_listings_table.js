exports.up = async function (knex) {
  await knex.schema.createTable("listings", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("startingPrice", 10, 2).notNullable();
    table.string("seller").notNullable();
    table.text("imageUrl").notNullable();
    table.string("createdAt").notNullable();
    table.string("status").notNullable();
    table.string("endsAt").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("listings");
};
