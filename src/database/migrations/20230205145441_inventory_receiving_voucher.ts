import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('inventory_receiving_vouchers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('status').notNullable();
    table.double('total');
    table.text('note').nullable();
    table.uuid('supplier_id').references('id').inTable('suppliers');

    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('user_updated');
    table.timestamp('user_created');

  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('inventory_receiving_vouchers');
}

