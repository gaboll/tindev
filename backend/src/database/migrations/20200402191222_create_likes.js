
exports.up = function(knex) {
  return knex.schema.createTable('likes', function (table) {
    table.increments();

    table.string('userLike').notNullable();

    table.string('devId').notNullable();
    table.foreign('devId').references('id').inTable('devs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('likes');
};
