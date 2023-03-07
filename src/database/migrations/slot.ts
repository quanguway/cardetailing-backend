import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('slots', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title');
    table.boolean('is_empty');
    table.uuid('booking_id').references('id').inTable('booking').onUpdate('CASCADE').onDelete('CASCADE');

  });
}
 

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('slots');
}

 