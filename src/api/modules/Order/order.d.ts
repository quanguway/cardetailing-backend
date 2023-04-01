export interface Order {
	id?: string;
	note?: string;
	total?: number
	final_total?: number
	status?: string;
	date_created?: Date;
	date_updated?: Date;
	user_created?: Date;
	user_updateed?: Date;
	customer_id?: string;
}