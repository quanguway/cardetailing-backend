import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('booking', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('status').notNullable();
    table.text('note').nullable();
    table.uuid('customer_id').references('id').inTable('customers').onUpdate('CASCADE').onDelete('CASCADE');
    table.uuid('slot_id');
    table.double('total');
    table.uuid('employee_id');
    table.string('car_detail_id');
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');
  })
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('booking');
}

