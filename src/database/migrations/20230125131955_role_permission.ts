import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('role_permission', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('role_id').references('id').inTable('roles');
    table.uuid('permission_id').references('id').inTable('permission');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('role_permission');
}

