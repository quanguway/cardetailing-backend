import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { Staff } from "./staff";
import { StaffRepository } from "./staff.repository";

export class StaffService {
    private readonly staffRepository;
    private readonly addressService;

    constructor() {
        this.staffRepository = new StaffRepository(knex, 'staffs');
        this.addressService = new AddressService();
    }

    async getAll() {
        const response = await this.staffRepository.getAll();
        const addresses = await this.addressService.getArrayJson()
        response.forEach( async (element) => {
            // console.log(element.address_id);
            console.log(this.addressService.getNodeById(element.address_id as string));
            
            // const path = this.addressService.getPath(element.address_id as string); 
            // console.log(path);
        })
        return response; 
    }

    async findFirst(item: Staff) {
        return await this.staffRepository.findFirst(item);
    }

    async delete(id: string) {
        const response = await this.staffRepository.delete(id);
        return response;  
    }
}