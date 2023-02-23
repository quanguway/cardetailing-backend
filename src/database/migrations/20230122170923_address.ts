import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('addresses', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.integer('level').nullable();
    table.string('title').notNullable();
    table.text('description').nullable();
    table.uuid('parent_id').references('id').inTable('addresses');
    table.timestamp('date_created');
    table.timestamp('date_updated');
  });
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('addresses');
}

