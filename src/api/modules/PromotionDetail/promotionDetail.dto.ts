import { Permission } from "../Permission/permission";
import { Product } from "../Product/product";
import { Role } from "../Role/role";

export class PromotionDetailDTO{
    id: string;
    quantity_buy: number
    quantity_received: number
    minimum_total: number;
    percent: number;
    reduction_amount: number;
    maximum_reduction_amount: number;
    quality_product: number
    promotion_line_id: string;
    product?: Product;
  
    constructor(data: any, product?: Product | undefined) {
        this.id = data.id;
        this.quantity_buy = data.quantity_buy;
        this.quantity_received = data.quantity_received;
        this.minimum_total = data.minimum_total
        this.percent = data.percent
        this.reduction_amount = data.reduction_amount
        this.maximum_reduction_amount  = data.maximum_reduction_amount;
        this.quality_product  = data.quality_product;
        this.promotion_line_id  = data.promotion_line_id;
        this.product = product ?? undefined;
    }
  }