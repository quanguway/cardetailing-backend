import { Permission } from "../Permission/permission";
import { Product } from "../Product/product";
import { PromotionDetail } from "../PromotionDetail/promotionDetail";
import { Role } from "../Role/role";

export class PromotionLineProductDTO {
  id?: string;
  promotion_code?: string;
  type?: string;
  start_date?: Date;
  end_date?: Date;
  status?: boolean;

  maximum_reduction_amount: number;
  product_received_id: string;
  product_buy_id: string;
  quantity_product_buy: number;
  quantity_product_received: number;
  minimum_total: number;
  percent: number;
  total_budget: number;
  max_customer: number;

  promotion_id?: string;
  title?: string;
  description?: string;
  note?: string;
  product_buy?: any;
  product_received?: any;
  
  date_created?: Date;
  date_updated?: Date;
  staff_created?: Date;
  staff_updated?: Date;

  constructor(data: any, productBuy: any, productReceived: any ) {
    this.id = data.id;
    this.promotion_code = data.promotion_code;
    this.type = data.type;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.status = data.status;

    this.product_received_id = data.product_received_id;
    this.product_buy_id = data.product_buy_id;

    this.maximum_reduction_amount = data.maximum_reduction_amount;
    this.quantity_product_buy = data.quantity_product_buy;
    this.quantity_product_received = data.quantity_product_received;
    this.minimum_total = data.minimum_total;
    this.percent = data.percent;
    this.total_budget = data.total_budget;
    this.max_customer = data.max_customer;

    this.promotion_id = data.promotion_id;
    this.title = data.title;
    this.description = data.description;
    this.note = data.note;

    this.product_buy = productBuy;
    this.product_received = productReceived;
  }
}
