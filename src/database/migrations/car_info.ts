import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('car_info', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('car_branch_id');
    table.string('code');
    table.string('model');
    table.integer('number_of_seats')
  })

}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('car_info');
}

