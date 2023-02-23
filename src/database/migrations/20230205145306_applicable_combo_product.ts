import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('applicable_combo_products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('promotion_detail_id').references('id').inTable('promotion_details');
    table.uuid('combo_id').references('id').inTable('combos');
  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('applicable_combo_products');
}