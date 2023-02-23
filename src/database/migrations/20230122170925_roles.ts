import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roles');
}

