export interface PromotionDetail {
  id?: string;
  quantity_buy?: number
  quantity_received?: number
  minimum_total?: number;
  percent?: number;
  reduction_amount?: number;
  maximum_reduction_amount?: number;
  quality_product?: number;
  product_buy_id?: string;
  promotion_line_id?: string;
  product_received_id?: string;
}