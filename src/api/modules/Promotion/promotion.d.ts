export interface Promotion {
	id?: string;
	title?: string;
	description?: string;
	date_start: Date;
	date_end: Date;
	date_created?: date;
	date_updated?: Date;
	staff_updated?: Date;
	staff_created?: Date;
}