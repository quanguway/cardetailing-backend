export interface Unit {
	id?: string
	title?: string
	description?:string;
	image?: string
	start_date?: Date;
	end_date?: Date;
	status?: boolean
	note?: string;
	date_created?: Date;
	date_updated?: Date;
	staff_created?: Date;
	staff_updated?: Date;
}