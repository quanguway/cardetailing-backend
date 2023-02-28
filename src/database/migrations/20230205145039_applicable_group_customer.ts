import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('applicable_group_customers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('group_customer_id').references('id').inTable('group_customers').onUpdate('CASCADE').onDelete('CASCADE');;
    table.uuid('promotion_line_id').references('id').inTable('promotion_lines').onUpdate('CASCADE').onDelete('CASCADE');;
  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('applicable_group_customers');
}