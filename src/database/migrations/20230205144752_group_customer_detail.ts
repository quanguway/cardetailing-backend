import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('group_customer_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('group_customer_id').references('id').inTable('group_customers');
    table.uuid('customer_id').references('id').inTable('customers');
  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('group_customer_details');
}