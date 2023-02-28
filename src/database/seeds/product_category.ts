import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("product_categories").del();

    // Inserts seed entries
    await knex("product_categories").insert([
        {
            id: '72db5ebc-b4ca-11ed-afa1-0242ac120002',
            level: 0,
            title: 'Product_Service',
        },
        {
            id: '803ddf12-b4ca-11ed-afa1-0242ac120002',
            level: 1,
            title: 'Product',
            parent_id: '72db5ebc-b4ca-11ed-afa1-0242ac120002',
        },
        {
            id: '8b98034c-b4ca-11ed-afa1-0242ac120002',
            level: 1,
            title: 'Service',
            parent_id: '72db5ebc-b4ca-11ed-afa1-0242ac120002',
        },
        {
            id: 'af6fa13a-ae1c-11ed-afa1-0242ac120002',
            level: 2,
            title: 'Dầu nhớt',
            parent_id: '803ddf12-b4ca-11ed-afa1-0242ac120002',
        },
    ]);
};
