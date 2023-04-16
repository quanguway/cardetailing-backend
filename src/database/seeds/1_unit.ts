import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("units").del();

  // title: string;
  // 	description: string;
  // 	date_created: faker.date.past();
  // 	date_updated: Date;
  // 	staff_updated: Date;
  // staff_created: Date;
  // Inserts seed entries
  for (let index = 0; index < 1; index++) {
    await knex("units").insert([
      // {
      //     title: "lượt",
      //     description: faker.lorem.paragraph(),
      //     date_created: faker.date.past(),
      //     date_updated: faker.date.past(),
      //     staff_updated: faker.date.past(),
      //     staff_created: faker.date.past(),
      // },
      {
        id:"276ac4a3-d5d6-11ed-a956-0242ac150002",
        title: "Lượt",
        unit_code: "LUOT",
        description: "Không có mô tả",
        date_created: faker.date.past(),
        date_updated: faker.date.past(),
        staff_updated: faker.date.past(),
        staff_created: faker.date.past(),
      },
    ]);
  }
}
