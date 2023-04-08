import knex from "../../../database/knex";
import { ProductService } from "../Product/product.service";
import { PromotionDetail } from "./promotionDetail";
import { PromotionDetailDTO } from "./promotionDetail.dto";
import { PromotionDetailRepository } from "./promotionDetail.repository";
export class PromotionDetailService {
    private readonly promotionDetailRepository;
    private readonly productService;
    constructor() {
        this.promotionDetailRepository = new PromotionDetailRepository(knex, 'promotion_details');
        this.productService = new ProductService();
    }

    async getAll() {
        const response = await this.promotionDetailRepository.getAll();
        
        return response; 
    }

    async findFirst(item: PromotionDetail) {
        return await this.promotionDetailRepository.findFirst(item);
    }

    async findByFinalPrice(finalPrice: any) {
        try {
            return await knex('promotion_details')
                .where('minimum_total', '<' ,finalPrice)
                .andWhere('minimum_total', '!=', 0)
                .select();
        } catch (error) {
            console.log(error);
            
        }
    }

    async find(item: PromotionDetail) {
        const response = await this.promotionDetailRepository.find(item);
        const data = []
        for(const element of response) {
            const product = await this.productService.findFirst({id: element.product_received_id})
            const promotionDetailDTO = new PromotionDetailDTO(element, product);
            data.push(promotionDetailDTO)
        }
        return data
    }

    async delete(id: string) {
        const response = await this.promotionDetailRepository.delete(id);
        return response;  
    }
}