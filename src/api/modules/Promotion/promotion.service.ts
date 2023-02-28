import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { PromotionLineService } from "../PromotionLine/promotionLine.service";
import { RoleService } from "../Role/role.service";
import { UnitExchangeService } from "../UnitExchange/unitExchange.service";
import { Promotion } from "./promotion";
import { PromotionDTO } from "./promotion.dto";
import { PromotionRepository } from "./promotion.repository";

export class PromotionService {
    private readonly promtionRepository;
    private readonly promotionLineService;

    constructor() {
        this.promtionRepository = new PromotionRepository(knex, 'promotions');
        this.promotionLineService = new PromotionLineService();
    }

    async getAll() {
        const response = await this.promtionRepository.getAll();
        const promotions: any = []
        for(const element of response) {
            const promotionLines = await this.promotionLineService.find({promotion_id: element.id})
            const promotionDTO = new PromotionDTO(element, promotionLines)
            promotions.push({...promotionDTO})
        }  
        return promotions; 
    }

    async findFirst(item: Promotion) {
        return await this.promtionRepository.findFirst(item);
    }

    async delete(id: string) {
        const response = await this.promtionRepository.delete(id);
        return response;  
    }
}