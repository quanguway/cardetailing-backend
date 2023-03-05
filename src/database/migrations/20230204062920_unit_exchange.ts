import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('unit_exchanges', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.integer('value').nullable();
    table.string('title');
    table.boolean('is_base_unit').notNullable().defaultTo(false);
    table.boolean('is_report').notNullable().defaultTo(false)
    table.boolean('is_active').notNullable().defaultTo(false)
    table.boolean('allow_sale').notNullable().defaultTo(false)
    table.uuid('product_id').references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
    table.uuid('unit_id').references('id').inTable('units').onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp('date_created');
    table.timestamp('date_updated');
    table.timestamp('staff_updated');
    table.timestamp('staff_created');

  })
}



export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('unit_exchanges');
}

