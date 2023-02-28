import { Permission } from "../Permission/permission";

export class RegisterAuthDTO{
  id: string;
	user_name: string;
	access_type: string[];
  
    constructor(data: any, permission: Permission[]) {
      this.id = data.id;
      this.user_name = data.full_name;
      this.access_type = permission.map((value) => value.title)
    }
  }