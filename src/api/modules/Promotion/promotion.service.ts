import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { PromotionLineService } from "../PromotionLine/promotionLine.service";
import { RoleService } from "../Role/role.service";
import { UnitExchangeService } from "../UnitExchange/unitExchange.service";
import { Promotion } from "./promotion";
import { PromotionDTO } from "./promotion.dto";
import { PromotionRepository } from "./promotion.repository";
import { PromotionDetailRepository } from "../PromotionDetail/promotionDetail.repository";
import { PromotionLineRepository } from "../PromotionLine/promotionLine.repository";


export class PromotionService {
    private readonly promtionRepository;
    private readonly promotionLineService;
    private readonly promotionDetailRepository;
    private readonly promotionLineRepository;

    constructor() {
        this.promtionRepository = new PromotionRepository(knex, 'promotions');
        this.promotionLineService = new PromotionLineService();
        this.promotionDetailRepository = new PromotionDetailRepository(knex, 'promotion_details');
        this.promotionLineRepository = new PromotionLineRepository(knex, 'promotion_lines');


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

    async create(params:any) {
        console.log(params);
        await this.promtionRepository.create(params.promotion);

        const promotionDetail = {
            id: params.promotionDetail.id,
            promotion_code: params.promotionDetail.promotion_code,
            start_date: params.promotionDetail.start_date,
            end_date: params.promotionDetail
        }

        // this.promotionDetailRepository.create({
        //     id:
        // })
    }

    async delete(id: string) {
        const response = await this.promtionRepository.delete(id);
        return response;  
    }
}