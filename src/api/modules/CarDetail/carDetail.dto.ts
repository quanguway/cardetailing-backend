import { Address } from "../Address/address";
import { CarInfo } from "../CarInfo/carInfo";
import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class CarDetailDTO {
    id: string;
    number_plate: string;
    car_info?: CarInfo; 
  
    constructor(data: any, carInfo: CarInfo) {
      this.id = data.id;
      this.number_plate = data.number_plate;
      this.car_info = carInfo;
    }
  } 