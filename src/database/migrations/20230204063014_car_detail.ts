import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("car_details", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("car_info_id");
    table.uuid("customer_id");
    table.string("number_plate");
    table.string("engine");
    table.string("chassis");
    table.string("color");
    table.integer("number_seat");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("car_details");
}
