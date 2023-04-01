import { Address } from "../Address/address";
import { Customer } from "../Custommer/customer";
import { OrderDetail } from "../OrderDetail/orderDetail";
import { Permission } from "../Permission/permission";
import { Role } from "../Role/role";

export class OrderDTO{
    id: string;
    final_total: number;
    total: number;
    status: string;
    customer: any;
    order_details: OrderDetail[];
  
    constructor(data: any, orderDetail: any[] , customer: Customer) {
      this.id = data.id;
      this.final_total = data.final_total;
      this.total= data.total;
      this.status = data.status;
      this.customer= customer;
      this.order_details= orderDetail;
    }
  }