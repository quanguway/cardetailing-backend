import knex from "../../../database/knex";
import { PriceLineService } from "../PriceLine/priceLine.service";
import { ProductService } from "../Product/product.service";
import { UnitExchangeService } from "../UnitExchange/unitExchange.service";
import { BookingDetail } from "./bookingDetail";
import { BookingDetailDTO } from "./bookingDetail.dto";
import { BookingDetailRepository } from "./bookingDetail.repository";

export class BookingDetailService {
    private readonly BookingDetailRepository;
    private readonly productService;
    private readonly priceLineService;
    private readonly unitChangeService;
    constructor() {
        this.BookingDetailRepository = new BookingDetailRepository(knex, 'booking_details');
        this.productService = new ProductService();
        this.priceLineService = new PriceLineService();
        this.unitChangeService =  new UnitExchangeService();
    }
  
    async getAll() {
        const response = await this.BookingDetailRepository.getAll();
        
        return response; 
    }

    async findFirst(item: BookingDetail) {
        return await this.BookingDetailRepository.findFirst(item);
    }

    async createMany(items: any) {
        return await this.BookingDetailRepository.createMany(items);
    }

    async find(item: BookingDetail) {
        const response = await this.BookingDetailRepository.find(item);
        const array = []
        for (const element of response) {
            const product = await this.productService.findFirst({id: element.product_id})
            const priceLine = await this.priceLineService.findFirst({id: element.price_id})
            const unit_exchange = await this.unitChangeService.findFirst({id: element.unit_exchange_id})

            console.log(priceLine);

            const bookingDetailDTO = new BookingDetailDTO(element, product, priceLine, unit_exchange)
            array.push({...bookingDetailDTO})
        }  
        return array
    }

    async update(id:string,item: BookingDetail) {
       
        return this.BookingDetailRepository.update(id, item);
    }

    async delete(id: string) {
        const response = await this.BookingDetailRepository.delete(id);
        return response;  
    }
}