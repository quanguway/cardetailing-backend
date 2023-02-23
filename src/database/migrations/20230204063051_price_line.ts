import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('price_lines', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.double('price').notNullable();
    table.boolean('is_active').notNullable().defaultTo(false);
    table.uuid('product_id').references('id').inTable('products');
    table.uuid('unit_exchange_id').references('id').inTable('unit_exchanges');
    table.uuid('price_header_id').references('id').inTable('price_headers');
    table.uuid('car_detail_id').references('id').inTable('car_details');

    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('price_lines');
}

