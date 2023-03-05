import { BookingDetail } from "../BookingDetail/bookingDetail";
import { Customer } from "../Custommer/customer";
import { Permission } from "../Permission/permission";
import { UnitExchange } from "../UnitExchange/unitExchange";

export class BookingDTO{
    id:string
    status:string
    note: string
    customer: Customer
    booking_details: BookingDetail[]
    date_created :Date
    date_updated:Date
    user_created:Date
    user_updateed:Date
  
    constructor(data: any, customer: Customer, bookingDetails: BookingDetail[]) {
      this.id = data.id;
      this.status = data.status;
      this.note = data.note;
      this.customer = customer;
      this.booking_details = bookingDetails;
      this.date_created = data.date_created
      this.date_updated = data.date_updated
      this.user_created = data.user_created
      this.user_updateed = data.user_updateed
    }
  }