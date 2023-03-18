import { Permission } from "../Permission/permission";
import { Product } from "../Product/product";
import { Role } from "../Role/role";
import { Unit } from "../Unit/unit";
import { UnitExchange } from "../UnitExchange/unitExchange";

export class PriceLineDTO{

    id?: string;
    price?: number;
    is_active?: boolean;
    product?: Product;
    unit?: Unit;
    price_header_id?: string
    product_title?: string;
    unit_title?: string;
  
    constructor(data: any, product: Product, unit: Unit) {
        this.id = data.id;
        this.price = data.price;
        this.is_active = data.is_active;
        this.product  = product;
        this.unit = unit;
        this.price_header_id = data.price_header_id;
        this.product_title = product?.title as string;
        this.unit_title = unit.title;
    }
  }