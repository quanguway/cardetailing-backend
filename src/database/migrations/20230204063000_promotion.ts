import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('promotions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title').nullable();
    table.text('description');
    table.string('image')
    table.timestamp('date_start')
    table.timestamp('date_end')
    table.boolean('status').nullable().defaultTo(false)
    table.text('note').nullable();
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');

  })
}



export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('promotions');
}

