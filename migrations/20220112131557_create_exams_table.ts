import { Knex } from 'knex';

const tableName = 'exams';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.increments();
    table.string('name');
    table.timestamp('deleted_at');
    table.enum('type', ['CLINICAL_ANALYSIS', 'IMAGE']);
    table.enum('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
