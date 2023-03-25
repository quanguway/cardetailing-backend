import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('promotion_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.integer('quantity_product_received').nullable();
    table.integer('quantity_product_buy');
    table.double('percent').defaultTo(0);
    table.double('reduction_amount').defaultTo(0);
    table.double('maximum_reduction_amount');
    table.double('reduction_amount_total');
    table.double('minimum_total');
    table.timestamp('start_date').notNullable()
    table.timestamp('end_date').notNullable()
    table.uuid('promotion_line_id').references('id').inTable('promotion_lines').onUpdate('CASCADE').onDelete('CASCADE');
    table.uuid('product_received_id').references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
    table.uuid('product_buy_id').references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created'); 

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('promotion_details');
}

