import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('car_branch', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title');
  })

}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('car_branch');
}

