import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("slots").del();

    // Inserts seed entries
    const salt = await bcrypt.genSalt(12);
    const array: any[] = [];
   
        
        for (let index = 0; index < 6; index++) {
            array.push({
                title: `slot ${index}`,
                is_empty: true
            })
        }
        await knex("slots").insert(array);

    
    

    
};
