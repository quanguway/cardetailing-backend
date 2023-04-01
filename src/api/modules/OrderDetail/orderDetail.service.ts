import { constants } from "buffer";
import knex from "../../../database/knex";
import { BookingDetail } from "../BookingDetail/bookingDetail";
import { PriceLineService } from "../PriceLine/priceLine.service";
import { ProductService } from "../Product/product.service";
import { UnitExchangeService } from "../UnitExchange/unitExchange.service";
import { OrderDetailDTO } from "./orderDetail.dto";
import { OrderDetail } from "./orderDetail";
import { OrderDetailRepository } from "./orderDetail.repository";

export class OrderDetailService {
    private readonly orderDetailRepository;
    private readonly productService;
    private readonly priceLineService;
    private readonly unitExchangeService;
    constructor() {
        this.orderDetailRepository = new OrderDetailRepository(knex, 'order_details');
        this.productService = new ProductService();
        this.priceLineService = new PriceLineService();
        this.unitExchangeService =  new UnitExchangeService();
    }

    async getAll() {
        const response = await this.orderDetailRepository.getAll();
        return response; 
    }

    async findFirst(item: OrderDetail) {
        return await this.orderDetailRepository.findFirst(item);
    }

    async find(item: OrderDetail) {
        const response = await this.orderDetailRepository.find(item);
        const array = []
        for (const element of response) {
            const product = await this.productService.findFirst({id: element.product_id})
            console.log(element)
            
            const priceLine = await this.priceLineService.findFirst({id: element.price_line_id})
            // const unit_exchange = await this.unitExchangeService.findFirst({id: element.unit_exchange_id})
            

            const dto = new OrderDetailDTO(element, product, priceLine)
            array.push({...dto})
        }  
        return array 
    }

    async update(id:string,item: BookingDetail) {
       
        return this.orderDetailRepository.update(id, item);
    }

    async delete(id: string) {
        const response = await this.orderDetailRepository.delete(id);
        return response;  
    }

    async createMany(items: OrderDetail[]) {
        const reponse = await this.orderDetailRepository.createMany(items)
    }
}