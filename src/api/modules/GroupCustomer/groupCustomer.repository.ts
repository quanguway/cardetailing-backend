import knex from "../../../database/knex";
import { BaseRepository } from "../../repositories/base.repository";
import { GroupCustomer } from "./groupCustomer";

export class GroupCustomerRepository extends BaseRepository<GroupCustomer> {
    async getCustomerOfGroupCustomer(group_customer_id: string) {
        return await knex('customers').whereIn('id',
            knex('group_customer_details').select('customer_id').where('group_customer_id', group_customer_id)
        );
    }
}