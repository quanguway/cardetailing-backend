export interface Product {
  id: String;
  product_code: String;
  type: 'product' | 'service';
  title: String;
  description: String;
  time: Number;
  image: String;
  status: boolean;
  note: string;
  category_id: String;
  date_created: Date
  date_updated: Date
  staff_updated: Date;
  staff_created: Date;
}