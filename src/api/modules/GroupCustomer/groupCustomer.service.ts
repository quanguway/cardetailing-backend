import knex from "../../../database/knex";
import { AddressService } from "../Address/address.service";
import { RoleService } from "../Role/role.service";
import { GroupCustomer } from "./groupCustomer";
import { GroupCustomerRepository } from "./groupCustomer.repository";

export class GroupCustomerService {
    private readonly groupCustomerRepository;

    constructor() {
        this.groupCustomerRepository = new GroupCustomerRepository(knex, 'group_customers');
    }

    async getAll() {
        const response = await this.groupCustomerRepository.getAll();
        return response; 
    }

    async findFirst(item: GroupCustomer) {
        return await this.groupCustomerRepository.findFirst(item);
    }

    async update(id:string, item: any) {
        return await this.groupCustomerRepository.update(id, item);
    }

    async create(item: any) {
        return await this.groupCustomerRepository.create(item);
    }

    async getCustomerOfGroupCustomer(group_customer_id: string) {
        return await this.groupCustomerRepository.getCustomerOfGroupCustomer(group_customer_id)
    }


    async delete(id: string) {
        const response = await this.groupCustomerRepository.delete(id);
        return response;  
    }
}