import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("permission").del();

    // Inserts seed entries
    await knex("permission").insert([
        {
            id: 'f1cf3ebe-ae1c-11ed-afa1-0242ac120002',
            level: 1,
            title: 'ACCESS_CONSOLE',
        },
        {
            id: '1487159e-ae1d-11ed-afa1-0242ac120002',
            level: 1,
            title: 'ALL',
        },
        {
            id: 'a78f7396-ae1c-11ed-afa1-0242ac120002',
            level: 1,
            title: 'USER',
        },
        {
            id: 'af6fa13a-ae1c-11ed-afa1-0242ac120002',
            level: 2,
            title: 'USER_READ',
            parent_id: 'a78f7396-ae1c-11ed-afa1-0242ac120002',
        },
    ]);
};
