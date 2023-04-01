import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('price_headers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title').nullable();
    table.text('description');
    table.string('code');
    table.timestamp('start_date')
    table.timestamp('end_date')
    table.boolean('is_active').nullable().defaultTo(false)
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');

  })
}



export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('price_headers');
}

