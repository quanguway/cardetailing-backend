import knex from "../../../database/knex";
import { BookingService } from "../Booking/booking.service";
import { PriceLineService } from "../PriceLine/priceLine.service";
import { Slot } from "./slot";
import { SlotDTO } from "./slot.dto";
import { SlotRepository } from "./slot.repository";
import { Booking } from "../Booking/booking";


export class SlotService {
    private readonly slotRepository;
    private readonly priceLineService;

    constructor() {
        this.slotRepository = new SlotRepository(knex, 'slots');
        this.priceLineService = new PriceLineService();
    }

    async getAll() { 
        const response = await this.slotRepository.getAll();
        const arr: any[] = [];
        for(const element of response) {
            const bookingService = new BookingService();
            const booking = element.booking_id ? await bookingService.findFirst({id: element.booking_id}) : undefined
            console.log(booking);
            
            arr.push(new SlotDTO(element, booking as Booking))
        }
        return arr; 
    } 

    async findFirst(item: Slot) {
        return await this.slotRepository.findFirst(item);
    } 

    async update (id:string, item: Slot) {
        return await this.slotRepository.update(id, item)
    }

    async delete(id: string) {
        const response = await this.slotRepository.delete(id);
        return response;  
    }
}