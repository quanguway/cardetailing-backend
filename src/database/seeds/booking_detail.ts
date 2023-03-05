import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("booking_details").del();

    // Inserts seed entries
    const booking_detail: any[] = [];

    // id?: string
    // status?: 'PENDING' | 'CONFIRMED' | 'CANCEL' | 'PROCESSING' | 'FINISHED'
    // booking_id?: string
    // product_id?: string
    // unit_exchange_id?: string
    // price_id?: string
    // note?: string 
    // date_created?: Date
    // date_updated?: Date
    // user_created?: Date
    // user_updated?: Date

    await knex('promotions').pluck('id').then( async(promotion_ids) => {
        
        for (let index = 0; index < 20; index++) {
            booking_detail.push({
                status: faker.helpers.arrayElement(['PENDING', 'CONFIRMED', 'CANCEL', 'PROCESSING', 'FINISHED']),
                booking_id: faker.helpers.arrayElement(await knex('booking').pluck('id')),
                product_id: faker.helpers.arrayElement(await knex('products').pluck('id')),
                unit_exchange_id: faker.helpers.arrayElement(await knex('unit_exchanges').pluck('id')),
                price_id: faker.helpers.arrayElement(await knex('price_lines').pluck('id')),
                note: faker.lorem.paragraph(),
                date_created: faker.date.past(),
                date_updated: faker.date.past(),
                staff_created: faker.date.past(),
                staff_updated: faker.date.past(),
            })
        }
        await knex("booking_details").insert(booking_detail);
    });
    
    

    
};
