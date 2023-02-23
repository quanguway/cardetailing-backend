import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('suppliers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name').notNullable();
    table.string('phone').nullable().unique();
    table.string('email').nullable().unique();
    table.text('note').nullable();
    table.uuid('address_id').references('id').inTable('addresses');
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('user_updated');
    table.timestamp('user_created');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('suppliers');
}

