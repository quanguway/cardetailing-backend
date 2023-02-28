import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('car_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.integer('level').nullable();
    table.string('image').nullable();
    table.text('description').nullable();
    table.uuid('parent_id').references('id').inTable('car_details').onUpdate('CASCADE').onDelete('CASCADE');;
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');
  })

}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('car_details');
}

