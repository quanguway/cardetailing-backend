import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class ProductDTO{
  id: String;
  product_code: String;
  type: string;
  title: String;
  description: String;
  time: Number;
  image: String;
  status: boolean;
  note: string;
  category_paths: String[];
  
    constructor(data: any, categoryPath: string[]) {
      this.id = data.id;
      this.product_code = data.product_code;
      this.title = data.title;
      this.type = data.type;
      this.description = data.description
      this.time = data.time;
      this.note = data.note;
      this.image = data.image;
      this.category_paths = categoryPath;
      this.status = data.status;
    }
  }