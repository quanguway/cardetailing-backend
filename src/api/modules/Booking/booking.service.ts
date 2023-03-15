import knex from "../../../database/knex";
import { BookingDetail } from "../BookingDetail/bookingDetail";
import { BookingDetailService } from "../BookingDetail/bookingDetail.service";
import { CarDetailService } from "../CarDetail/carDetail.service";
import { CustomerService } from "../Custommer/customer.service";
import { SlotService } from "../Slot/slot.service";
import { Booking } from "./booking";
import { BookingDTO } from "./booking.dto";
import { BookingRepository } from "./booking.repository";

export class BookingService {
    private readonly bookingRepository;
    private readonly bookingDetailService;
    private readonly customerService;
    private readonly carDetailservice;
    private readonly slotService;

    constructor() {
        this.bookingRepository = new BookingRepository(knex, 'booking');
        this.bookingDetailService = new BookingDetailService();
        this.customerService = new CustomerService();
        this.carDetailservice = new CarDetailService();
        this.slotService = new SlotService();
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

    async create(item: any){
        const customer = await this.customerService.create(item.customer)
        const carDetail = await this.carDetailservice.create(item.car_detail);

        const booking = { 
            id: item.id,
            customer_id: item.customer.id,
            slot_id: item.slot_id,
            status: 'WAITING'
        } 

        this.slotService.update(item.slot_id, {is_empty: false, booking_id: item.id})

        const bookingCreated = await this.bookingRepository.create(booking);
        const bookingDetails = await this.bookingDetailService.createMany(item.booking_details)
 
    }

    async createWithOldCustomer(item: any){
        const booking = { 
            id: item.id,
            customer_id: item.customer_id,
            slot_id: item.slot_id,
            status: 'WAITING'
        } 

        this.slotService.update(item.slot_id, {is_empty: false, booking_id: item.id})

        const bookingCreated = await this.bookingRepository.create(booking);
        const bookingDetails = await this.bookingDetailService.createMany(item.booking_details)
 
    }

    async delete(id: string) {
        const response = await this.bookingRepository.delete(id);
        return response;  
    }
}