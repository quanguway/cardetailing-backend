import { Permission } from "../Permission/permission";
import { Product } from "../Product/product";
import { Role } from "../Role/role";

export class UnitExchangeDTO{

    id: string;
    value: number;
    is_base_unit: boolean;
    is_report: boolean
    is_active: boolean
    allow_sale: boolean
    unit_id : string;
    product: Product;
  
    constructor(data: any, product: Product) {
        this.id = data.id;
        this.value = data.value;
        this.is_base_unit = data.is_base_unit;
        this.is_report = data.is_report
        this.is_active = data.is_active
        this.allow_sale = data.allow_sale
        this.product  = product;
        this.unit_id  = data.unit;
    }
  }