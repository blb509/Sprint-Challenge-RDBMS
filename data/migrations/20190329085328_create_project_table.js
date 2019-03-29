exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();

      tbl.string("description", 128);

      tbl.boolean("status").notNullable();
    })

    .createTable("actions", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();

      tbl.string("notes", 128);

      tbl.boolean("status").notNullable();

      tbl.integer("project_id").notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions").dropTableIfExists("projects");
};
