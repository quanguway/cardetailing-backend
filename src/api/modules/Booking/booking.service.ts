import knex from "../../../database/knex";
import { BookingDetail } from "../BookingDetail/bookingDetail";
import { BookingDetailService } from "../BookingDetail/bookingDetail.service";
import { CustomerService } from "../Custommer/customer.service";
import { Booking } from "./booking";
import { BookingDTO } from "./booking.dto";
import { BookingRepository } from "./booking.repository";

export class BookingService {
    private readonly bookingRepository;
    private readonly bookingDetailService;
    private readonly customerService;

    constructor() {
        this.bookingRepository = new BookingRepository(knex, 'booking');
        this.bookingDetailService = new BookingDetailService();
        this.customerService = new CustomerService();
    }

    async getAll() {
        const response = await this.bookingRepository.getAll();
        const array: any = []
        for(const element of response) {
            const bookingDetails = await this.bookingDetailService.find({booking_id: element.id})
            const customer = await this.customerService.findFirst({id: element.customer_id})
            const dto = new BookingDTO(element, customer, bookingDetails as BookingDetail[]);
            array.push({...dto})
        }

        
        return array; 
    }

    async findFirst(item: Booking) {
        return await this.bookingRepository.findFirst(item);
    }

    async update (id:string, item: Booking) {
        return await this,this.bookingRepository.update(id, item)
    }

    async delete(id: string) {
        const response = await this.bookingRepository.delete(id);
        return response;  
    }
}