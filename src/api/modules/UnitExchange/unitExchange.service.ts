import knex from "../../../database/knex";
import { ProductService } from "../Product/product.service";
import { UnitExchange } from "./unitExchange";
import { UnitExchangeDTO } from "./unitExchange.dto";
import { UnitExchangeRepository } from "./unitExchange.repository";
export class UnitExchangeService {
    private readonly unitExchangeRepository;
    private readonly productService;
    constructor() {
        this.unitExchangeRepository = new UnitExchangeRepository(knex, 'unit_exchanges');
        this.productService = new ProductService();
    }

    async getAll() {
        const response = await this.unitExchangeRepository.getAll();
        
        return response; 
    }

    async findFirst(item: UnitExchange) {
        return await this.unitExchangeRepository.findFirst(item);
    }

    async find(item: UnitExchange) {
        const response = await this.unitExchangeRepository.find(item);
        const unitExchanges = []
        for (const element of response) {
            const product = await this.productService.findFirst({id: element.product_id})
            const unitExchange = new UnitExchangeDTO(element, product)
            unitExchanges.push({...unitExchange})
        }  
        return unitExchanges
    }

    async update(id:string,item: UnitExchange) {
       console.log(id);
       
        return this.unitExchangeRepository.update(id, item);
    }

    async delete(id: string) {
        const response = await this.unitExchangeRepository.delete(id);
        return response;  
    }
}