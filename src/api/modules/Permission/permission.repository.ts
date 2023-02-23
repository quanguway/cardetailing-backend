
import knex from "../../../database/knex";
import { BaseRepository } from "../../repositories/base.repository";
import { Permission } from "./permission";

export class PermissionRepository extends BaseRepository<Permission> {
    
    async getPermissionOfPermission(role_id: string | undefined) {
        
        if (role_id) {
            return await knex('permission').whereIn('id',
                knex('role_permission').select('permission_id').where('role_id', role_id)
            );
        }
    }
}