import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { RoleService } from "../Role/role.service";
import { UnitExchangeService } from "../UnitExchange/unitExchange.service";
import { Unit } from "./unit";
import { UnitDTO } from "./unit.dto";
import { UnitRepository } from "./unit.repository";

export class UnitService {
    private readonly unitRepository;
    private readonly unitExchangeService;

    constructor() {
        this.unitRepository = new UnitRepository(knex, 'units');
        this.unitExchangeService = new UnitExchangeService();
    }

    async getAll() {
        const response = await this.unitRepository.getAll();
        const units: any = []
        for(const element of response) {
            const getAllUnitWchangeByUnit = await this.unitExchangeService.find({unit_id: element.id})
            const unitDTO = new UnitDTO(element, getAllUnitWchangeByUnit)
            units.push({...unitDTO})
        }

        
        return units; 
    }

    async existByCode(code: string) {
        return this.unitRepository.exist({unit_code: code})
    }

    async getUnitOfProduct(product_id: string) {
        return this.unitRepository.getUnitOfProduct(product_id)
    }

    async findFirst(item: Unit) {
        return await this.unitRepository.findFirst(item);
    }

    async update (id:string, item: Unit) {
        return await this,this.unitRepository.update(id, item)
    }

    async delete(id: string) {
        const response = await this.unitRepository.delete(id);
        return response;  
    }
}