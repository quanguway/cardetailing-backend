import knex from "../../../database/knex";
import { Permission } from "./permission";
import { PermissionRepository } from "./permission.repository";

export class PermissionService {
    private readonly permissionRepository;

    constructor() {
        this.permissionRepository = new PermissionRepository(knex, 'permissions');
    }

    async getAll() {
        const response = await this.permissionRepository.getAll();
        return response;  
    }

    async findFirst(item: Permission) {
        return await this.permissionRepository.findFirst(item);
    }

    async getPermissionOfRole(roleId: string | undefined) {
        return await this.permissionRepository.getPermissionOfPermission(roleId);
    }

    async delete(id: string) {
        const response = await this.permissionRepository.delete(id);
        return response;  
    }
}