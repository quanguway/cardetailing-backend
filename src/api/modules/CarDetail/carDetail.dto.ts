import { Address } from "../Address/address";
import { CarInfo } from "../CarInfo/carInfo";
import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class CarDetailDTO {
  id: string;
  number_plate: string;
  engine?: string;
  chassis?: string;
  color?: string;
  number_seat?: number;
  car_info?: any;
  customer_id?: string;

  constructor(data: any, carInfo: any) {
    this.id = data.id;
    this.number_plate = data.number_plate;
    this.car_info = carInfo;
    this.engine = data.engine;
    this.chassis = data.chassis;
    this.color = data.color;
    this.number_seat = data.number_seat;
  }
}
