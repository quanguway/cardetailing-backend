import { Address } from "../Address/address";
import { OrderDetail } from "../OrderDetail/orderDetail";
import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class OrderDTO{
    id: string;
    final_total: number;
    total: number;
    status: string;
    customer_title: string;
    order_details: OrderDetail[]
  
    constructor(data: any,orderDetail: , customer: Customer) {
      this.id = data.id;
      this.final_total = data.final_total;
      this.total= data.total;
      this.status = data.status;
      this.customer_title= string;
      this.order_details= OrderDetail[]
    }
  }