import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("role_permission").del();

    // Inserts seed entries
    await knex("role_permission").insert([
        { role_id: 'c7f0ac26-ae1d-11ed-afa1-0242ac120002', permission_id: '' },
    ]);
};
