import knex from "../../../database/knex";
import { ProductService } from "../Product/product.service";
import { UnitService } from "../Unit/unit.service";
import { UnitExchangeService } from "../UnitExchange/unitExchange.service";
import { PriceLine } from "./priceLine";
import { PriceLineDTO } from "./priceLine.dto";
import { PriceLineRepository } from "./priceLine.repository";
export class PriceLineService {
    private readonly priceLineRepository;
    // private readonly unitExchangeService;
    // private readonly unitService;
    constructor() {
        this.priceLineRepository = new PriceLineRepository(knex, 'price_lines');
        // this.unitExchangeService = new UnitExchangeService();
        // this.unitService = new UnitService();
    }

    async getAll() {
        const response = await this.priceLineRepository.getAll();
        
        return response; 
    }

    async findFirst(item: PriceLine) {
        return await this.priceLineRepository.findFirst(item);
    }

    async find(item: PriceLine) {
        const response = await this.priceLineRepository.find(item);
        
        // const array = []
        // for (const element of response) {
        //     const product = await this.productService.findFirst({id: element.product_id})
            
        //     const unit = await this.unitService.findFirst({id: element.unit_id as string})
        //     const pricLine = new PriceLineDTO(element, product, unit)
        //     array.push({...pricLine})
        // }  
        return response 
    }

    async update(id:string,item: PriceLine) {
       console.log(id);
       
        return this.priceLineRepository.update(id, item);
    }

    async delete(id: string) {
        const response = await this.priceLineRepository.delete(id);
        return response;  
    }
}