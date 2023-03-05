import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("group_customers").del();

    // Inserts seed entries
    const salt = await bcrypt.genSalt(12);
    const posts: any[] = [];

    // id varchar [pk]
    // name varchar
    // discription longtext
    // note longtext
    // date_created timestamptz
    // date_updated timestamptz
    // staff_updated varchar
    // staff_created varchar
        
        for (let index = 0; index < 5; index++) {
            posts.push({
                title: faker.internet.userName(),
                note: faker.lorem.paragraph(),
                description: faker.lorem.paragraph(),
                date_created: faker.date.past(),
                date_updated: faker.date.past(),
                staff_updated: faker.date.past(),
                staff_created: faker.date.past(),
            })
        }
        await knex("group_customers").insert(posts);
    
    

    
};
