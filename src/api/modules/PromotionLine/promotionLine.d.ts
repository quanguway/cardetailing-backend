export interface PromotionLine {
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
}