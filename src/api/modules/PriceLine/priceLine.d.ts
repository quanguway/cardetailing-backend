export enum EPriceLine {
	product = 'PRODUCT',
	service = 'SERVICE,'
}

export interface PriceLine {
	id:string;
  _type: EPriceLine;
  description: string;
  product_id:string;
  price_header_id:string;
  unit_exchange_id:string;
  car_detail_id:string; // chua rela
}