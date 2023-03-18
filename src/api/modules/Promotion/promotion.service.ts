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

        const promotionLine = params.promotionDetail.map((item: any) => ({
            id: item.id,
            promotion_code: item.promotion_code,
            start_date: item.start_date,
            end_date: item.end_date,
            promotion_id: params.promotion.id
        })) 

        const promotionDetail = params.promotionDetail.map((item:any) => ({
            percent: item.percent,
            reduction_amount: item.reduction_amount,
            price_line_id: item.id,

        }))

        this.promotionLineRepository.createMany(promotionLine);
        this.promotionDetailRepository.createMany(promotionDetail);
    }

    async delete(id: string) {
        const response = await this.promtionRepository.delete(id);
        return response;  
    }
}