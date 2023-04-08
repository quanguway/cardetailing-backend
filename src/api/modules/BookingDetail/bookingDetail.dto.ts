import { Permission } from "../Permission/permission";
import { PriceLine } from "../PriceLine/priceLine";
import { Product } from "../Product/product";
import { Role } from "../Role/role";
import { Staff } from "../Staff/staff";
import { UnitExchange } from "../UnitExchange/unitExchange";

export class BookingDetailDTO{
    id?: string
    status?: string
    booking_id?: string
    product?: Product
    unit_exchange?: UnitExchange
    price?: PriceLine
    note?: string 
    type?: string
    staff?: Staff
    price_final?: any;
    product_recived_title?:any;
    date_created?: Date
    date_updated?: Date
    user_created?: Date
    user_updated?: Date
  
    constructor(data: any, product: Product, unit_exchange: UnitExchange , price: PriceLine, staff: Staff, priceFinal: any, productRecived: any) {
        this.id = data.id;
        this.status = data.status;
        this.booking_id = data.booking_id;
        this.unit_exchange = unit_exchange
        this.price = data.is_active
        this.note = data.note    
        this.type = data.type
        this.product  = product;
        this.price = price;   
        this.staff = staff;
        this.price_final = priceFinal;
        this.product_recived_title = productRecived?.title ?? '';
        this.date_created  = data.date_created;
        this.date_updated  = data.date_updated;
        this.user_created  = data.user_created;
        this.user_updated  = data.user_updated;
    }
  }