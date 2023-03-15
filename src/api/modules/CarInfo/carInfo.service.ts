import knex from "../../../database/knex";
import { AddressService } from "../Address/address.service";
import { RoleService } from "../Role/role.service";
import { CarInfo } from "./carInfo";
import { CarInfoRepository } from "./carInfo.repository";

export class CarInfoService {
    private readonly carInfoRepository;

    constructor() {
        this.carInfoRepository = new CarInfoRepository(knex, 'car_info');
    }

    async getAll() {
        const response = await this.carInfoRepository.getAll();
        
        return response;  
    }

    async findFirst(item: CarInfo) {
        return await this.carInfoRepository.findFirst(item);
    }

    // async update(id:string, item: any) {
    //     const addressId = item.address.id;
    //     let address;
    //     if(!this.addressService.isExist(addressId)) {
    //         address = await this.addressService.create(item.address)
    //     }
    //     delete item.address;
    //     item.address_id = address?.id ?? addressId;
        
    //     return await this.carInfoRepository.update(id, item);
    // }

    // async create(item: any) {
    //     const addressId = item.address.id;
    //     let address;
    //     if(!this.addressService.isExist(addressId)) {
    //         address = await this.addressService.create(item.address)
    //     }
    //     // const staff = item.map(({address, ...orther}:{address:any}) => orther)
    //     delete item.address;
    //     item.address_id = address?.id ?? addressId;
    //     return await this.carInfoRepository.create(item);
    // }


    async delete(id: string) {
        const response = await this.carInfoRepository.delete(id);
        return response;  
    }
}