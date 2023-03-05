import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { RoleService } from "../Role/role.service";
import { Staff } from "./staff";
import { StaffDTO } from "./staff.dto";
import { StaffRepository } from "./staff.repository";

export class StaffService {
    private readonly staffRepository;
    private readonly addressService;
    private readonly roleService;

    constructor() {
        this.staffRepository = new StaffRepository(knex, 'staffs');
        this.addressService = new AddressService();
        this.roleService = new RoleService();
    }

    async getAll() {
        const response = await this.staffRepository.getAll();
        const staffs: any = []
        for(const element of response) {
            const address = this.addressService.getNodeById(element.address_id as string);
            const addressPathTitles = this.addressService.getPathByTitle(address.title);
            const addressPaths = this.addressService.getPathById(element.address_id as string)
            
            const addressPathsCustom = addressPaths;
            const addressPathTitlesCustom = addressPathTitles.slice(addressPathTitles.indexOf('/') + 1);
            
            const role = await this.roleService.findById(element.role_id);
            const staffDTO = new StaffDTO(element, role, addressPathsCustom.split('.'), addressPathTitlesCustom);
            staffs.push({...staffDTO});
        }
        
        return staffs; 
    }

    async findFirst(item: Staff) {
        return await this.staffRepository.findFirst(item);
    }

    async update(id:string, item: any) {
        const addressId = item.address.id;
        let address;
        if(!this.addressService.isExist(addressId)) {
            address = await this.addressService.create(item.address)
        }
        delete item.address;
        item.address_id = address?.id ?? addressId;
        
        return await this.staffRepository.update(id, item);
    }

    async create(item: any) {
        const addressId = item.address.id;
        let address;
        if(!this.addressService.isExist(addressId)) {
            address = await this.addressService.create(item.address)
        }
        delete item.address;
        item.address_id = address?.id ?? addressId;
        return await this.staffRepository.create(item);
    }


    async delete(id: string) {
        const response = await this.staffRepository.delete(id);
        return response;  
    }
}