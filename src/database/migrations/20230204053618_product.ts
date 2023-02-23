import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('product_code').nullable();
    table.string('type').notNullable();
    table.string('title').notNullable();
    table.text('description').nullable();
    table.integer('time_finish').nullable();
    table.string('image').nullable();
    table.boolean('status').nullable();
    table.text('note').nullable();
    table.uuid('category_id').references('id').inTable('product_categories');
    table.timestamp('date_created').nullable();
    table.timestamp('date_updated').nullable();
    table.timestamp('staff_created').nullable();
    table.timestamp('staff_updated').nullable();

  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}

