export interface PromotionHistory {
  id?: string;
  
  amount?: number;
  quality?: number
  type?: string;
  status?:string
  promotion_line_id?:string
  buy_order_detail_id?:string
  received_order_detail_id?:string
  order_id?:string;

  description?: string;
  date_created?: Date;
  date_updated?: Date;
  staff_created?: Date;
  staff_updated?: Date;
}
