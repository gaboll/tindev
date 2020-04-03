
exports.up = function(knex) {
  return knex.schema.createTable('dislikes', function (table) {
    table.increments();

    table.string('userDislike').notNullable();

    table.string('devId').notNullable();
    table.foreign('devId').references('id').inTable('devs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('dislikes');
};
