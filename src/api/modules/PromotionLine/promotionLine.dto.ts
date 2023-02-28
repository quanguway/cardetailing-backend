import { Permission } from "../Permission/permission";
import { Product } from "../Product/product";
import { PromotionDetail } from "../PromotionDetail/promotionDetail";
import { Role } from "../Role/role";

export class PromotionLineDTO{

    id?: string;
    promotion_code?: string
    type?: 'GET_PRODUCT' | 'PRICE' | 'PERCENT'
    start_date?: Date;
    end_date?: Date;
    status?: boolean
    max_quantity?: number
    max_quantity_per_customer?: number
    max_quantity_per_customer_per_day?: number
    promotion_id?: string
    title?: string
    description?: string;
    note?: string;
    date_created?: Date;
    date_updated?: Date;
    staff_created?: Date;
    staff_updated?: Date;
    promotion_detail: PromotionDetail;
  
    constructor(data: any, promotionDetail: PromotionDetail) {
        this.id = data.id;
        this.promotion_code = data.promotion_code;
        this.type = data.type;
        this.start_date = data.start_date
        this.end_date = data.end_date
        this.status = data.status
        this.max_quantity  = data.max_quantity;
        this.max_quantity_per_customer  = data.max_quantity_per_customer;
        this.max_quantity_per_customer_per_day  = data.max_quantity_per_customer_per_day;
        this.promotion_id  = data.promotion_id;
        this.title  = data.title;
        this.description  = data.description;
        this.note  = data.note;
        this.date_created  = data.date_created;
        this.date_updated  = data.date_updated;
        this.staff_created  = data.staff_created;
        this.staff_updated  = data.staff_updated;
        this.promotion_detail = promotionDetail;
    }
  }