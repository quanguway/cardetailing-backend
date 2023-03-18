import { Knex } from "knex";
import { addressData } from "../data/address";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw("SET FOREIGN_KEY_CHECKS=0");
  await knex("addresses").del();

  // Inserts seed entries
  // await knex("addresses").insert([
  //     {
  //       'id': '7467d49c-a93d-11ed-afa1-0242ac120002',
  //       'level': 0,
  //       'title': 'Address',
  //     },
  //     {
  //       'id': '7447d49c-a95d-11ed-afa1-0242ac120002',
  //       'level': 1,
  //       'title': 'HCM',
  //       parent_id: '7467d49c-a93d-11ed-afa1-0242ac120002'
  //     },
  //     {
  //       id: '8c07d910-a95d-11ed-afa1-0242ac120002',
  //       level: 2,
  //       title: 'Quận 1',
  //       parent_id: '7447d49c-a95d-11ed-afa1-0242ac120002',
  //     },
  //     {
  //       id: '989bbad4-a95d-11ed-afa1-0242ac120002',
  //       level: 3,
  //       title: 'Bình thạnh',
  //       parent_id: '8c07d910-a95d-11ed-afa1-0242ac120002',
  //     },
  //     {
  //       id: 'b694d3e6-bee2-11ed-afa1-0242ac120002',
  //       level: 4,
  //       title: 'asdasdwdasd',
  //       parent_id: '989bbad4-a95d-11ed-afa1-0242ac120002',
  //     },
  //     {
  //       'id': '6b30266c-a970-11ed-afa1-0242ac120002',
  //       'level': 1,
  //       'title': 'Bến Tre',
  //       parent_id: '7467d49c-a93d-11ed-afa1-0242ac120002'
  //     },
  //     {
  //       id: 'badf5728-e4a7-4f30-8eff-6f95ff43974c',
  //       level: 2,
  //       title: 'Phường 4',
  //       parent_id: '6b30266c-a970-11ed-afa1-0242ac120002',
  //     },
  // ]);
  await knex("addresses").insert(addressData);
}
