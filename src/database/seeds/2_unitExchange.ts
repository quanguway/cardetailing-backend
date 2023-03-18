import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("unit_exchanges").del();

    const unit_exchanges: any[] = [];
    await knex('products').pluck('id').then( async(product_id) => {
        await knex('units').pluck('id').then( async(unit_id) => {
            for (let index = 0; index < 20; index++) {
                unit_exchanges.push({
                    value: faker.datatype.number(),
                    is_base_unit: faker.datatype.boolean(),
                    is_report: faker.datatype.boolean(),
                    is_active: faker.datatype.boolean(),
                    allow_sale:faker.datatype.boolean(),
                    product_id: faker.helpers.arrayElement(await knex('products').pluck('id')),
                    unit_id: faker.helpers.arrayElement(unit_id),
                    date_created: faker.date.past(),
                    date_updated: faker.date.past()
                })
            }
            await knex("unit_exchanges").insert(unit_exchanges);
        })
    });
    
    

    
};
