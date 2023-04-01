export interface PromotionLine {
  id?: string;
  promotion_code?: string;
  title?: string;
  type?: string;
  status?: boolean;

  maximum_reduction_amount?: number;
  product_received_id?: string;
  product_buy_id?: string;
  quantity_product_buy?: number;
  quantity_product_received?: number;
  minimum_total?: number;
  percent?: number;
  total_budget?: number;
  max_customer?: number;
  start_date?: Date;
  end_date?: Date;

  note?: string;
  promotion_id?: string;
  description?: string;
  date_created?: Date;
  date_updated?: Date;
  staff_created?: Date;
  staff_updated?: Date;
}
