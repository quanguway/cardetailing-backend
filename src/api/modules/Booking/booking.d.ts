export interface Booking {
	id?:string
	status?:string
	note?: string
	customer_id?:string
	car_detail_id?:string
	date_created?:Date
	date_updated?:Date
	user_created?:Date
	user_updateed?:Date
}