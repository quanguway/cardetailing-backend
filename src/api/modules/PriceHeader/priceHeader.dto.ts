import { Permission } from "../Permission/permission";
import { PriceLine } from "../PriceLine/priceLine";

export class PriceHeaderDTO{
    id: string;
    title: string;
	  description: string;
    start_date: Date
    end_date: Date
    is_active: boolean
    priceLine: PriceLine[];
  
    constructor(data: any, priceLine: PriceLine[]) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.is_active = data.is_active;
      this.priceLine = priceLine;
    }
  }