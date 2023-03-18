import { Booking } from "../Booking/booking";

export class SlotDTO{

    id?: string;
    title?: string;
    is_empty?: boolean;
    // booking?: Booking;
    booking_id?: string; 
  
    constructor(data: any, booking: Booking) {
        this.id= data.id;
        this.title= data.title;
        this.is_empty= data.is_empty;
        this.booking_id = booking?.id;  
    }
  } 