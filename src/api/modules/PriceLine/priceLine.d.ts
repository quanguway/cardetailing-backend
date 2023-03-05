export interface PriceLine {
  id?:string
  price?: number
  is_active?: boolean
  product_id?:string
  unit_id?:string
  price_header_id?:string
  car_detail_id?:string
  date_created?: Date
  date_updated?: Date
  staff_updated?:string
  staff_created?:string
}