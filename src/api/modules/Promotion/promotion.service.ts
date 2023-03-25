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
        try {
            await this.promtionRepository.create(params.promotion);

            console.log(params.promotionDetail);
            

            const promotionLine = params.promotionDetail.map((item: any) => ({
                id: item.id,
                promotion_code: item.promotion_code,
                start_date: item.start_date,
                end_date: item.end_date,
                type: item.type,
                promotion_id: params.promotion.id
            })) 
            
            const promotionDetail = params.promotionDetail.map((item:any) => ({
                percent: ! item.percent ? 0 : item.percent,
                reduction_amount: ! item.reduction_amount ? 0 : item.reduction_amount,
                promotion_line_id: item.id,
                product_received_id: item.product_received_id,
                product_buy_id: item.product_buy_id,
                start_date: item.start_date,
                end_date: item.end_date,
                quantity_product_buy: item.quantity_product_buy ?? 0,
                minimum_total: item.minimum_total ?? 0,
            }))

            await this.promotionLineRepository.createMany(promotionLine);
            await this.promotionDetailRepository.createMany(promotionDetail);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    async delete(id: string) {
        const response = await this.promtionRepository.delete(id);
        return response;  
    }
}