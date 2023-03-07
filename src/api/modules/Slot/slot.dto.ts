import { Booking } from "../Booking/booking";

export class SlotDTO{

    id?: string;
    title?: string;
    is_empty?: boolean;
    booking?: Booking;
  
    constructor(data: any, booking: Booking) {
        this.booking = booking;
        this.id= data.id;
        this.title= data.title;
        this.is_empty= data.is_empty;
    }
  } 