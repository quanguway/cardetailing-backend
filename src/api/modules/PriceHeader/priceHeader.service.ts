import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { PriceLineService } from "../PriceLine/priceLine.service";
import { RoleService } from "../Role/role.service";
import { PriceHeader } from "./priceHeader";
import { PriceHeaderDTO } from "./priceHeader.dto";
import { PriceHeaderRepository } from "./priceHeader.repository";

export class PriceHeaderService {
    private readonly priceHeader;
    private readonly priceLineService;

    constructor() {
        this.priceHeader = new PriceHeaderRepository(knex, 'price_headers');
        this.priceLineService = new PriceLineService();
    }

    async getAll() { 
        const response = await this.priceHeader.getAll();
        const units: any = []
        for(const element of response) {
            const priceLines = await this.priceLineService.find({price_header_id: element.id as string})
            const dto = new PriceHeaderDTO(element, priceLines)
            units.push({...dto})
        }

        
        return units; 
    }

    async findFirst(item: PriceHeader) {
        return await this.priceHeader.findFirst(item);
    }

    async update (id:string, item: PriceHeader) {
        return await this.priceHeader.update(id, item)
    }

    async create (priceHeader: PriceHeader, priceLines: any) {
        try {
            console.log(priceHeader);
            await knex.transaction(async (trx: any) => {
                const reponse = await knex('price_headers').insert(priceHeader).transacting(trx); 
                const priceLineCustom = priceLines.map(({...element }) => {return {...element, price_header_id: priceHeader.id}});
                await knex('price_lines').insert(priceLineCustom).transacting(trx);

              
            })
          } catch (error) { 
            console.error(error);
          }
    } 

    async delete(id: string) {
        const response = await this.priceHeader.delete(id);
        return response;  
    }
}