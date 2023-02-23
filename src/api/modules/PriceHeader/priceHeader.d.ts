export interface PriceHeader {
	id: string;
  title: string;
  unit: string; // chua rõ
  start_date: date;
  end_date: date;
  product_id: string;
  is_active: boolean;
  description: string;
  staff_created: string;
  staff_updated: string;
}