import knex from "../../../database/knex";
import { AddressService } from "../Address/address.service";
import { CarDetailService } from "../CarDetail/carDetail.service";
import { RoleService } from "../Role/role.service";
import { Customer } from "./customer";
import { CustomerDTO } from "./customer.dto";
import { CustomerRepository } from "./customer.repository";

export class CustomerService {
  private readonly customerRepository;
  private readonly addressService;
  private readonly roleService;
  private readonly carDetailService;

  constructor() {
    this.customerRepository = new CustomerRepository(knex, "customers");
    this.addressService = new AddressService();
    this.roleService = new RoleService();
    this.carDetailService = new CarDetailService();

  }

  async getAll() {
    const response = await this.customerRepository.getAll();
    const staffs: any = [];
    for (const element of response) {
      try {
        const address = this.addressService.getNodeById(
          element.address_id as string
        );
        const addressPathTitles = this.addressService.getPathByTitle(
          address.title
        );
        const addressPaths = this.addressService.getPathById(
          element.address_id as string
        );
        const addressPathsCustom = addressPaths;
        const addressPathTitlesCustom = addressPathTitles.slice(
          addressPathTitles.indexOf("/") + 1
        );
        const role = await this.roleService.findById(element.role_id);

        const carDetails = await this.carDetailService.find({customer_id: element.id})
        const dto = new CustomerDTO(
          element,
          role,
          addressPathsCustom.split("."),
          addressPathTitlesCustom,
          carDetails
        );
        staffs.push({ ...dto });
      } catch (error) {
        console.log(element);
      }
    }

    return staffs;
  }

  async findFirst(item: Customer) {
    try {
      const customer = await this.customerRepository.findFirst(item);
      const address = this.addressService.getNodeById(
        customer.address_id as string
      );
      const addressPathTitles = this.addressService.getPathByTitle(
        address?.title ?? null
      );
      const addressPaths = this.addressService.getPathById(
        customer?.address_id as string ?? null
      );
      const addressPathsCustom = addressPaths;
      const addressPathTitlesCustom = addressPathTitles.slice(
        addressPathTitles.indexOf("/") + 1
      );
      const role = await this.roleService.findById(customer.role_id);

      const carDetails = await this.carDetailService.find({customer_id: customer.id as string})


      const dto = new CustomerDTO(
        customer,
        role,
        addressPathsCustom.split("."),
        addressPathTitlesCustom,
        carDetails
      );
      return dto;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, item: any) {
    const addressId = item.address.id;
    let address;
    if (!this.addressService.isExist(addressId)) {
      address = await this.addressService.create(item.address);
    }
    delete item.address;
    item.address_id = address?.id ?? addressId;

    return await this.customerRepository.update(id, item);
  }

  async create(item: any) {
    const addressId = item.address.id;
    let address;
    if (!this.addressService.isExist(addressId)) {
      address = await this.addressService.create(item.address);
    }
    // const staff = item.map(({address, ...orther}:{address:any}) => orther)
    delete item.address;
    item.role_id = "c7f0ac26-ae1d-11ed-afa1-0242ac120002";
    item.address_id = address?.id ?? addressId;
    return await this.customerRepository.create(item);
  }

  async delete(id: string) {
    const response = await this.customerRepository.delete(id);
    return response;
  }
}
