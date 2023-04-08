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
    book_id: string;
    order_details: OrderDetail[];
    promotion?: any;
    
    constructor(data: any, orderDetail: any[] , customer: Customer, promotion?: any) {
      this.id = data.id;
      this.final_total = data.final_total;
      this.total= data.total;
      this.status = data.status;
      this.customer= customer;
      this.book_id = data.book_id;
      this.order_details= orderDetail;
      this.promotion = promotion;
    }
  }