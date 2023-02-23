export interface Customer {
	id?:string;
	full_name?:string;
	phone?:string;
	email?:string;
	gender?:boolean;
	note?: string;
	address_id?:string;
	avatar?: String;
	role_id?: string;
	password?: string;
	// date_joined?: Date
	date_created?: Date
	date_updated?: Date
	// staff_updated?:string;
	// staff_created?:string;
	code?:string;
}