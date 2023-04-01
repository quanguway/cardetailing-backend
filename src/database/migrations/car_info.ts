import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('car_info', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('code');
    table.uuid('branch');
    table.uuid('type');
  })

}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('car_info');
}

