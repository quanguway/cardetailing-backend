import knex from "../../../database/knex";
import { AddressService } from "../Address/address.service";
import { CarInfoService } from "../CarInfo/carInfo.service";
import { RoleService } from "../Role/role.service";
import { CarDetail } from "./carDetail";
import { CarDetailDTO } from "./carDetail.dto";
import { CarDetailRepository } from "./carDetail.repository";

export class CarDetailService {
    private readonly carDetailRepository;
    private readonly carInfoService;

    constructor() {
        this.carDetailRepository = new CarDetailRepository(knex, 'car_details');
        this.carInfoService = new CarInfoService();
    }

    async getAll() {
        const response = await this.carDetailRepository.getAll();
        
        return response;  
    }

    async find(item: CarDetail) {
        const response = await this.carDetailRepository.find(item);
        const array: any = []
        for(const element of response) {
            const carInfo = await this.carInfoService.findFirst({id: element.car_info_id})
            const dto = new CarDetailDTO(element, carInfo);
            array.push({...dto})
        }
        return array;
    }

    // async findFirst(item: Customer) {
    //     return await this.carDetailRepository.findFirst(item);
    // }

    // async update(id:string, item: any) {
    //     const addressId = item.address.id;
    //     let address;
    //     if(!this.addressService.isExist(addressId)) {
    //         address = await this.addressService.create(item.address)
    //     }
    //     delete item.address;
    //     item.address_id = address?.id ?? addressId;
        
    //     return await this.carDetailRepository.update(id, item);
    // }

    async create(item: any) {

        return await this.carDetailRepository.create(item);
    }


    async delete(id: string) {
        const response = await this.carDetailRepository.delete(id);
        return response;  
    }
}