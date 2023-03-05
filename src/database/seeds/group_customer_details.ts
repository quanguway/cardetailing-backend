import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("group_customer_details").del();
    const posts: any[] = [];

        for (let index = 0; index < 20; index++) {
            posts.push({
                group_customer_id: faker.helpers.arrayElement(await knex('group_customers').pluck('id')),
                customer_id: faker.helpers.arrayElement(await knex('customers').pluck('id')),
            })
        }
        await knex("group_customer_details").insert(posts);
};
