import { transcode } from "buffer";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('promotion_lines', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title')
    table.text('description')
    table.text('note')
    table.string('promotion_code').nullable();
    table.string('type').notNullable()
    table.timestamp('start_date').notNullable()
    table.timestamp('end_date').notNullable()
    table.boolean('status').notNullable().defaultTo(false);
    table.integer('max_quantity')
    table.integer('max_quantity_per_customer')
    table.integer('max_quantity_per_customer_per_day')
    table.uuid('promotion_id').references('id').inTable('promotions').onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp('date_created');
    table.timestamp('date_updated'); 
    table.timestamp('staff_updated');
    table.timestamp('staff_created'); 

  })
}



export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('promotion_lines');
}

