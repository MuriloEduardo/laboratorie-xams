import { Knex } from 'knex';

const tableName = 'associations';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.integer('exam_id').unsigned().references('id').inTable('exams');
    table
      .integer('laboratory_id')
      .unsigned()
      .references('id')
      .inTable('laboratories');

    table.unique(['exam_id', 'laboratory_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
