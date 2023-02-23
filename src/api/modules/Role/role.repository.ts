import knex from "knex";
import { BaseRepository } from "../../repositories/base.repository";
import { Role } from "./role";

export class RoleRepository extends BaseRepository<Role> {
    
    async getPermissionOfRole(role_id: string) {
        return await knex('permission').whereIn('id',
            knex('role_permission').select('permission_id').where('role_id', role_id)
     );
    }
}