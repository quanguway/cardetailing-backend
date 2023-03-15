import knex from "../../../database/knex";
import { Role } from "./role";
import { RoleRepository } from "./role.repository";

export class RoleService {
    private readonly roleRepository;

    constructor() {
        this.roleRepository = new RoleRepository(knex, 'roles');
    }

    async getAll() {
        const response = await this.roleRepository.getAll();
        return response;  
    }

    async delete(id: string) {
        const response = await this.roleRepository.delete(id);
        return response;  
    }

    async create(Role: Role) {

    }

    async find(item: Partial<Role>) {
        const response = await this.roleRepository.find(item);
        return response;
    }

    async findById(id: string | undefined) {
 
        const response = await this.roleRepository.findById(id);
        return response;
    }
}