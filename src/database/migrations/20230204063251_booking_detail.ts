import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('booking_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.boolean('status').notNullable().defaultTo(false);
    table.text('note').nullable();
    table.uuid('booking_id').references('id').inTable('booking').onUpdate('CASCADE').onDelete('CASCADE');;
    table.uuid('product_id').references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');;
    table.uuid('unit_exchange_id').references('id').inTable('unit_exchanges').onUpdate('CASCADE').onDelete('CASCADE');;
    table.uuid('price_line_id').references('id').inTable('price_lines').onUpdate('CASCADE').onDelete('CASCADE');;

    table.string('title').notNullable();
    table.text('description').nullable();
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('user_created');
    table.timestamp('user_updated');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('booking_details');
}

