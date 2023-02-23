import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('inventory_receiving_voucher_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.integer('quantity').notNullable();
    table.double('price');
    table.text('note').nullable();
    table.uuid('product_id').references('id').inTable('products');
    table.uuid('receiving_voucher_id').references('id').inTable('inventory_receiving_vouchers');
    table.uuid('unit_exchange_id').references('id').inTable('unit_exchanges');

    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('user_updated');
    table.timestamp('user_created');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('inventory_receiving_voucher_details');
}

