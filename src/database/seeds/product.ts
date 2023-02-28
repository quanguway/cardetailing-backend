import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    const salt = await bcrypt.genSalt(12);
    const products: any[] = [];
    await knex('product_categories').pluck('id').then( async(category_id) => {
        
        for (let index = 0; index < 20; index++) {
            products.push({
                product_code: faker.internet.userName(),
                type: faker.helpers.arrayElement(['PRODUCT', 'SERVICE']),
                title: faker.internet.userName(),
                description: faker.lorem.paragraph(),
                note: faker.lorem.paragraph(),
                // time: faker.datatype.number(),
                image: faker.image.avatar(),
                status: faker.datatype.boolean(),
                category_id: faker.helpers.arrayElement(category_id),
                date_created: faker.date.past(),
                date_updated: faker.date.past()
            })
        }
        await knex("products").insert(products);
    });
    
    

    
};
