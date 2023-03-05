import { Knex } from "knex";
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("customers").del();

    // Inserts seed entries
    const salt = await bcrypt.genSalt(12);
    const posts: any[] = [];
    await knex('addresses').pluck('id').then( async(address_id) => {
        address_id = address_id.filter((element) => element != '7467d49c-a93d-11ed-afa1-0242ac120002')
        const hashPassword = await bcrypt.hash('123', salt);
        
        for (let index = 0; index < 20; index++) {
            posts.push({
                full_name: faker.internet.userName(),
                phone: faker.phone.number('+84-###-###-###'), 
                email:faker.internet.email(),
                gender: faker.datatype.boolean(),
                note: faker.lorem.paragraph(),
                address_id: faker.helpers.arrayElement(address_id),
                avatar: faker.image.avatar(),
                password: hashPassword,
                role_id: faker.helpers.arrayElement(['c7f0ac26-ae1d-11ed-afa1-0242ac120002', 'c010ff7e-ae1d-11ed-afa1-0242ac120002']),
                date_created: faker.date.past(),
                date_updated: faker.date.past()
            })
        }
        posts.push({
            full_name: 'Nguyễn Nhật Quang',
            phone: '+848553300586',
            email: 'quang@gmail.com',
            gender: true,
            note: faker.lorem.paragraph(),
            address_id: faker.helpers.arrayElement(address_id),
            avatar: faker.image.avatar(),
            password: hashPassword,
            role_id: 'c7f0ac26-ae1d-11ed-afa1-0242ac120002',
            date_created: faker.date.past(),
            date_updated: faker.date.past()
        })
        await knex("customers").insert(posts);
    });
    
    

    
};
