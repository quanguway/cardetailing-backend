import knex from "../../../database/knex";
import { ProductService } from "../Product/product.service";
import { PromotionDetailService } from "../PromotionDetail/promotionDetail.service";
import { PromotionLine } from "./promotionLine";
import { PromotionLineDTO } from "./promotionLine.dto";
import { PromotionLineRepository } from "./promotionLine.repository";
export class PromotionLineService {
    private readonly promotionLineRepository;
    private readonly promotionDetailService;
    constructor() {
        this.promotionLineRepository = new PromotionLineRepository(knex, 'promotion_lines');
        this.promotionDetailService = new PromotionDetailService();
    }

    async getAll() {
        const response = await this.promotionLineRepository.getAll();
        
        return response; 
    }

    async findFirst(item: PromotionLine) {
        return await this.promotionLineRepository.findFirst(item);
    }

    async find(item: PromotionLine) {
        const response = await this.promotionLineRepository.find(item);
        const promotionLines = []
        for (const element of response) {
            const promotionDetail = await this.promotionDetailService.findFirst({promotion_line_id: element.id})
            
            const promotionLine = new PromotionLineDTO(element, promotionDetail)
            promotionLines.push({...promotionLine})
        }  
        return promotionLines;
    }

    async delete(id: string) {
        const response = await this.promotionLineRepository.delete(id);
        return response;  
    }
}