export interface BookingDetail {
  id?: string;
  status?: "PENDING" | "CONFIRMED" | "CANCEL" | "PROCESSING" | "FINISHED";
  booking_id?: string;
  product_id?: string;
  unit_exchange_id?: string;
  price_id?: string;
  staff_id?: string;
  note?: string;
  type?: string;
  price_final?: number;
  product_recived_title?: string;
  date_created?: Date;
  date_updated?: Date;
  user_created?: Date;
  user_updated?: Date;
}
