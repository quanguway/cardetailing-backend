import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class RegisterAuthDTO{
  id?: string;
	user_name?: string;
  role?: string;
  
    constructor(data: any, role?: Role) {
      this.id = data.id;
      this.user_name = data.full_name;
      this.role = role?.title;
    }
  }