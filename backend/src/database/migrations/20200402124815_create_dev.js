
exports.up = function (knex) {
  return knex.schema.createTable('devs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('user').notNullable();
    table.string('bio');
    table.string('avatar').notNullable();
    table.specificType('likes', 'STRING[]');
    table.specificType('dislikeslikes', 'STRING[]');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('devs');
};
