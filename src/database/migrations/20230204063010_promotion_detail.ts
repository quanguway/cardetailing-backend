import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('promotion_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.integer('quantity_buy').nullable();
    table.integer('quantity_received').nullable();
    table.integer('quality_product');
    table.double('percent');
    table.double('reduction_amount');
    table.double('maximum_reduction_amount');
    table.uuid('promotion_line_id').references('id').inTable('promotion_lines');
    table.uuid('product_received_id').references('id').inTable('products');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('promotion_details');
}

