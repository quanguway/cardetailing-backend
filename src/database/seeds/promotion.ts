import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("promotions").del();

    // Inserts seed entries
    const salt = await bcrypt.genSalt(12);
    const promotions: any[] = [];
        
        for (let index = 0; index < 6; index++) {
            promotions.push({
                title: faker.internet.userName(),
                description: faker.lorem.paragraph(),
                date_created: faker.date.past(),
                date_updated: faker.date.past(),
                staff_updated: faker.date.past(),
                staff_created: faker.date.past(),
            })
        }
        await knex("promotions").insert(promotions);
};
