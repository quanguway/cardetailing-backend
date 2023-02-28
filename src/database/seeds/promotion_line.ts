import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("promotion_lines").del();

    // Inserts seed entries
    const promotion_lines: any[] = [];
    await knex('promotions').pluck('id').then( async(promotion_ids) => {
        
        for (let index = 0; index < 20; index++) {
            promotion_lines.push({
                promotion_code: faker.internet.userName(),
                type: faker.helpers.arrayElement(['GET_PRODUCT' , 'PRICE' , 'PERCENT']),
                start_date: faker.date.past(),
                end_date: faker.date.future(),
                status: faker.datatype.boolean(),
                max_quantity: faker.datatype.number(),
                max_quantity_per_customer: faker.datatype.number(),
                max_quantity_per_customer_per_day: faker.datatype.number(),
                title: faker.internet.userName(),
                description: faker.lorem.paragraph(),
                note: faker.lorem.paragraph(),
                promotion_id: faker.helpers.arrayElement(promotion_ids),
                date_created: faker.date.past(),
                date_updated: faker.date.past(),
                staff_created: faker.date.past(),
                staff_updated: faker.date.past(),
            })
        }
        await knex("promotion_lines").insert(promotion_lines);
    });
    
    

    
};
