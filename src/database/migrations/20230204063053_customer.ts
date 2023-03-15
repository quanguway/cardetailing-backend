import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('customers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('full_name').notNullable();
    table.string('password').nullable();
    table.string('phone').nullable();
    table.string('email').nullable();
    table.boolean('gender').nullable().defaultTo(false);
    table.text('note');
    table.string('avatar');
    table.uuid('address_id').references('id').inTable('addresses').onUpdate('CASCADE').onDelete('CASCADE');;
    table.uuid('role_id').references('id').inTable('roles').onUpdate('CASCADE').onDelete('CASCADE');;
    table.timestamp('date_created');
    table.timestamp('date_updated');
  });
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('customers');
}

