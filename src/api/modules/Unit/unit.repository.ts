import knex from "../../../database/knex";
import { BaseRepository } from "../../repositories/base.repository";
import { Unit } from "./unit";

export class UnitRepository extends BaseRepository<Unit> {
    async getUnitOfProduct(product_id: string) {
    
        return await knex('units').whereIn('id',
            knex('unit_exchanges').select('unit_id').where('product_id', product_id)
        );
    }
}