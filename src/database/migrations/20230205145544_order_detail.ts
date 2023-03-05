import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('order_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('type').notNullable();
    table.string('status').notNullable();
    table.integer('quality');
    table.double('total')
    table.uuid('product_id').references('id').inTable('products');
    table.uuid('order_id').references('id').inTable('orders');
    table.uuid('price_line_id').references('id').inTable('price_lines');
    table.uuid('unit_id').references('id').inTable('units');
    
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('uesr_updated');
    table.timestamp('uesr_created');
 
  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('order_details');
}