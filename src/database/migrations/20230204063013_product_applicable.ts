import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('product_applicables', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('promotion_detail_id').references('id').inTable('promotion_details');
    table.uuid('product_id').references('id').inTable('products');
    table.uuid('unit_exchange_id').references('id').inTable('unit_exchanges')
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('product_applicables');
}

