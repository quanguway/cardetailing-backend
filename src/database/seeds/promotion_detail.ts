import { Knex } from "knex";
import {faker} from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("promotion_details").del();

    // Inserts seed entries
    const promotion_details: any[] = [];
    await knex('promotion_lines').pluck('id').then( async(promotion_line_ids) => {
        // await knex('products').pluck('id').then( async(product_ids) => {
            for (let index = 0; index < 60; index++) {
                promotion_details.push({
                    quantity_buy: faker.datatype.number(),
                    quantity_received: faker.datatype.number(),
                    minimum_total: faker.datatype.number(),
                    percent: faker.datatype.number(),
                    reduction_amount: faker.datatype.number(),
                    maximum_reduction_amount: faker.datatype.number(),
                    quality_product: faker.datatype.number(),
                    promotion_line_id: faker.helpers.arrayElement(promotion_line_ids), 
                    // product_received_id: faker.helpers.arrayElement(product_ids)
                })
            }
        // })
        
        
        await knex("promotion_details").insert(promotion_details)
    });
    
    

    
};
