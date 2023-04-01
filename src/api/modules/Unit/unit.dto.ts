import { Permission } from "../Permission/permission";
import { UnitExchange } from "../UnitExchange/unitExchange";

export class UnitDTO {
  id: string;
  title: string;
  description: string;
  unitExchanges: UnitExchange[];
  unit_code: string;
  note: string;
  constructor(data: any, unitExchange: UnitExchange[]) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.unit_code = data.unit_code;
    this.unitExchanges = unitExchange;
    this.note = data.note;
  }
}
