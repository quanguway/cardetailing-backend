import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('promotion_histories', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.double('amount')
    table.integer('quality');
    table.string('type').notNullable();
    table.string('status').notNullable();
    table.uuid('promotion_line_id').references('id').inTable('promotion_lines');
    table.uuid('buy_order_detail_id').references('id').inTable('order_details');
    table.uuid('received_order_detail_id').references('id').inTable('order_details');
    table.uuid('order_id').references('id').inTable('orders');
    
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('uesr_updated');
    table.timestamp('uesr_created');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('promotion_histories');
}