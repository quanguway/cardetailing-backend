import knex from "../../../database/knex";
import { RoleRepository } from "../Role/role.repository";
import { Customer } from "./customer";
import { CustomerRepository } from "./customer.repository";
import bcrypt from 'bcrypt';

export class CustomerService {
    private readonly customerRepository;
    private readonly roleRepository;

    constructor() {
        this.customerRepository = new CustomerRepository(knex, 'customers');
        this.roleRepository = new RoleRepository(knex, 'roles')
    }

    async getAll() {
        const response = await this.customerRepository.getAll();
        return response;  
    }

    async delete(id: string) {
        const response = await this.customerRepository.delete(id);
        return response;  
    }

    async find(item: Customer) {
        return await this.customerRepository.find(item);
    }

    async findFirst(item: Customer) {
        return await this.customerRepository.findFirst(item);
    }

    async create(customer: Customer) {
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(customer.password?.toString() ?? '', salt);
        customer.password = hashPassword;
        customer.role_id = (await this.roleRepository.find({title: 'CUSTOMER'})).at(0)?.id
        const response = await this.customerRepository.create(customer);
        return customer;  
    }
} 