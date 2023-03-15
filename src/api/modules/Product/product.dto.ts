import { Permission } from "../Permission/permission";
import { PriceLine } from "../PriceLine/priceLine";
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
  category_paths: String;
  category_path_ids: string[];
  price_line?: number;
  price_line_id?: string;
  
    constructor(data: any, categoryPathIds: string[], categoryPath: string, priceLine: PriceLine) {
      console.log(priceLine);
      
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
      this.category_path_ids = categoryPathIds
      this.price_line = priceLine?.price as number;
      this.price_line_id = priceLine?.id as string;
    } 
  }