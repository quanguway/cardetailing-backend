export interface Order {
	id?: string;
	note?: string;
	total?: number
	final_total?: number
	status?: string;
	book_id?: string;
	promotion_line_id?: string;
	date_created?: Date;
	date_updated?: Date;
	user_created?: Date;
	user_updateed?: Date;
	customer_id?: string;
} 