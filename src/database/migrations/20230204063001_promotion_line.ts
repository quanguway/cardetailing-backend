import { transcode } from "buffer";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("promotion_lines", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("promotion_code").nullable();
    table.string("title");
    table.string("type").notNullable();
    table.boolean("status").notNullable().defaultTo(false);

    table.integer("maximum_reduction_amount");
    table.string("product_received_id");
    table.string("product_buy_id");
    table.integer("quantity_product_buy");
    table.integer("quantity_product_received");
    table.double("minimum_total");
    table.double("percent");
    table.double("total_budget");
    table.integer("max_customer");

    table.text("description");
    table.text("note");
    table.timestamp("start_date").notNullable();
    table.timestamp("end_date").notNullable();

    table
      .uuid("promotion_id")
      .references("id")
      .inTable("promotions")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("date_created");
    table.timestamp("date_updated");
    table.timestamp("staff_updated");
    table.timestamp("staff_created");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("promotion_lines");
}
