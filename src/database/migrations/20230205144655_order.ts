import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('status').notNullable();
    table.double('total');
    table.double('final_total');
    table.text('description').nullable();
    table.text('note').nullable();
    table.uuid('book_id');
    table.uuid('customer_id').references('id').inTable('customers');

    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('user_updated');
    table.timestamp('user_created');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('orders');
}

