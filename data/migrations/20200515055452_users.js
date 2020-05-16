
exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {
      table.increments()
      table.text("username").notNull().unique()
      table.text("password")
      table.text("department").defaultTo("normal")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable("users")
};
