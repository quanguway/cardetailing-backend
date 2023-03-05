import { Address } from "../Address/address";
import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class OrderDTO{
    id: string;
    full_name: string;
    phone: string;
    email: string;
    gender: boolean;
    note: string
    avatar: string
    role: Role;
    address_path_title: string;
    address_paths: string[];
  
    constructor(data: any, role: Role, address: string[], addressPathTitle:string) {
      this.id = data.id;
      this.full_name = data.full_name;
      this.phone = data.phone;
      this.email = data.email
      this.gender = data.gender;
      this.note = data.note;
      this.avatar = data.avatar;
      this.role = role;
      this.address_paths = address;
      this. address_path_title = addressPathTitle
    }
  }