import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('customers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('full_name').notNullable();
    table.string('password').notNullable();
    table.string('phone').nullable();
    table.string('email').nullable();
    table.boolean('gender').nullable().defaultTo(false);
    table.text('note');
    table.string('avatar');
    table.uuid('address_id').references('id').inTable('addresses');
    table.uuid('role_id').references('id').inTable('roles');
    table.timestamp('date_created');
    table.timestamp('date_updated');
  });
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('customers');
}

