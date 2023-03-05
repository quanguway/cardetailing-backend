import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('combo_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('combo_id').references('id').inTable('combos');
    table.uuid('product_id').references('id').inTable('products');
    table.uuid('unit_id').references('id').inTable('units');
  })
}
  

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('combo_details');
}