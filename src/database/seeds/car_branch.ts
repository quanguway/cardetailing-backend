import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import { carData } from "../data/carInfo";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("car_branch").del();

    // Inserts seed entries
    // const car_info: any[] = [];
    // for (let index = 0; index < 13; index++) {
    //     car_info.push({
    //         branch: faker.internet.userName(),
    //         type: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE', 'SUPER LARGE']), 
    //         // product_received_id: faker.helpers.arrayElement(product_ids)
    //     })
    // }


    await knex("car_branch").insert(carData);
}
