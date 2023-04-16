import knex from "../../../database/knex";
import { AddressService } from "../Address/address.service";
import { RoleService } from "../Role/role.service";
import { CarInfo } from "./carInfo";
import { CarInfoDTO } from "./carInfo.dto";
import { CarInfoRepository } from "./carInfo.repository";

export class CarInfoService {
    private readonly carInfoRepository;

    constructor() {
        this.carInfoRepository = new CarInfoRepository(knex, 'car_info');
    }

    async getAll() {
        const response = await this.carInfoRepository.getAll();

        const dto = [];

        for (const element of response) {
            const branch = await knex.table('car_branch').where('id', element.car_branch_id).first();
            console.log(branch); 
            
            dto.push(new CarInfoDTO(element, branch));
        }

        console.log(dto);
        
        return dto;  
    }

    async findFirst(item: CarInfo) {
        const carInfo = await this.carInfoRepository.findFirst(item);
        const carBranch = await knex('car_branch').where('id', carInfo.car_branch_id).first();
        console.log({
            ...carInfo,
            ...carBranch
        });
        
        return {
            ...carInfo,
            ...carBranch
        }
    }

    async update(id:string, item: any) {
        return await this.carInfoRepository.update(id, item);
    }

    async create(item: any) {
        return await this.carInfoRepository.create(item);
    }


    async delete(id: string) {
        const response = await this.carInfoRepository.delete(id);
        return response;  
    }
}