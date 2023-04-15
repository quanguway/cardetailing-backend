import { Address } from "../Address/address";
import { CarInfo } from "../CarInfo/carInfo";
import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class CarInfoDTO {
  id: string;
  branch: string;
  code?: string;
  model?: string;
  number_of_seats?: string;
 
  constructor(data: any, branch:any) {
    this.id = data.id;
    this.branch = branch.title;
    this.code = data.code;
    this.model = data.model;
    this.number_of_seats = data.number_of_seats;
  }
}
