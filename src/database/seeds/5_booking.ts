import { Knex } from "knex";
import {faker} from '@faker-js/faker';


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("booking").del();
    
    // id?:string
	// status?:string
	// note?: string
	// customer_id?:string
	// date_created?:Date
	// date_updated?:Date
	// user_created?:Date
	// user_updateed?:Date

    for (let index = 0; index < 5; index++) {
        await knex("booking").insert([
            {
                status: faker.internet.userName(),
                note: faker.lorem.paragraph(),
                customer_id: faker.helpers.arrayElement(await knex('customers').pluck('id')),
                date_created: faker.date.past(),
                date_updated: faker.date.past(),
                staff_updated: faker.date.past(),
                staff_created: faker.date.past(),
            }
        ]);
    }
};
