import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("roles").del();

    // Inserts seed entries
    await knex("roles").insert([
        { id:'c010ff7e-ae1d-11ed-afa1-0242ac120002', title: "Customer" },
        { id:'c7f0ac26-ae1d-11ed-afa1-0242ac120002', title: "Admin" }
    ]);
};
