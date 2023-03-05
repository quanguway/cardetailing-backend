import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('group_customers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title').notNullable();
    table.text('description').nullable();
    table.text('note').nullable();
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');
  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('group_customers');
}