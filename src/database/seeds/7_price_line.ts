import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("price_lines").del();

  // const price_lines: any[] = [];
  // const product_id = await knex('products').pluck('id');
  // const unit_exchange_id = await knex('unit_exchanges').pluck('id')
  // const price_header_id = await knex('price_headers').pluck('id')

  // for (let index = 0; index < 20; index++) {
  //     price_lines.push({
  //         price: faker.datatype.number(),
  //         is_active: faker.datatype.boolean(),
  //         product_id: faker.helpers.arrayElement(await knex('products').pluck('id')),
  //         // unit_id: faker.helpers.arrayElement(await knex('units').pluck('id')),
  //         // price_header_id: faker.helpers.arrayElement(price_header_id),
  //         date_created: faker.date.past(),
  //         date_updated: faker.date.past()
  //     })
  // }
  // await knex("price_lines").insert(price_lines);
}
