import knex from "../../../database/knex";
import { PriceLineService } from "../PriceLine/priceLine.service";
import { ProductCategoryService } from "../ProductCategory/productCategory.service";
import { PromotionDetailRepository } from "../PromotionDetail/promotionDetail.repository";
import { RoleService } from "../Role/role.service";
import { Product } from "./product";
import { ProductDTO } from "./product.dto";
import { ProductRepository } from "./product.repository";

export class ProductService {
    private readonly productRepository;
    private readonly productCategoryService;
    private readonly priceLineService;
    private readonly promotionDetailRepository;

    constructor() {
        this.productRepository = new ProductRepository(knex, 'products');
        this.productCategoryService = new ProductCategoryService();
        this.priceLineService = new PriceLineService();
        this.promotionDetailRepository = new PromotionDetailRepository(knex, 'promotion_details');
    }


    async getAllWithoutPrice() {
        const response = await this.productRepository.getAll();
        
        const products: any = []
        for(const element of response) {
            const productCategory = this.productCategoryService.getNodeById(element.category_id as string);
            const productCategoryPathTitles = this.productCategoryService.getPathByTitle(productCategory.title);
            const productCategoryPaths = this.productCategoryService.getPathById(element.category_id as string)
            
            const productCategoryPathsCustom = productCategoryPaths;
            const productCategoryPathTitlesCustom = productCategoryPathTitles.slice(productCategoryPathTitles.indexOf('/') + 1);

            const priceLine = await this.priceLineService.findFirst({product_id: element.id as string});
            
            

            const productDTO = new ProductDTO(element, productCategoryPathsCustom.split('.'), productCategoryPathTitlesCustom, priceLine);

            
            products.push({...productDTO});
        }
        return products;
    }

    async existByCode(code: string) {
        return this.productRepository.exist({product_code: code})
    }

    async getAll() {

        const priceLines = await knex('price_lines')
            .where(new Date() , '>', 'start_date')
            .andWhere(new Date(), '<', 'end_date')
            .andWhere('is_active', true);

        const products: any = []

        for(const element of priceLines) {
            const product = await this.productRepository.findFirst({id: element.product_id});

            const productCategory = this.productCategoryService.getNodeById(product.category_id as string);
            const productCategoryPathTitles = this.productCategoryService.getPathByTitle(productCategory.title);
            const productCategoryPaths = this.productCategoryService.getPathById(product.category_id as string)
            
            const productCategoryPathsCustom = productCategoryPaths;
            const productCategoryPathTitlesCustom = productCategoryPathTitles.slice(productCategoryPathTitles.indexOf('/') + 1);
         
            const promotionDetail = await knex('promotion_details')
            .where('product_buy_id', product.id)
            .andWhere('start_date' , '<', new Date())
            .andWhere('end_date', '>', new Date())
            .first();
            // .andWhere('is_active', true);

            console.log(promotionDetail);
            


            const reductioAmount = promotionDetail?.reduction_amount ?? 0;
            const percent = (promotionDetail?.percent ?? 0)/100
            const priceFinal = element.price - reductioAmount - element.price*(percent);

            const productRecived = ! promotionDetail ? null :  await this.productRepository.findFirst({id: promotionDetail.product_received_id});

            const productDTO = new ProductDTO(product, productCategoryPathsCustom.split('.'), productCategoryPathTitlesCustom, element, priceFinal, productRecived);


            console.log(promotionDetail);
            
            
            products.push({...productDTO});
        }
        

        // const response = await this.productRepository.getAll();
        
        // const products: any = []
        // for(const element of response) {
        //     const productCategory = this.productCategoryService.getNodeById(element.category_id as string);
        //     const productCategoryPathTitles = this.productCategoryService.getPathByTitle(productCategory.title);
        //     const productCategoryPaths = this.productCategoryService.getPathById(element.category_id as string)
            
        //     const productCategoryPathsCustom = productCategoryPaths;
        //     const productCategoryPathTitlesCustom = productCategoryPathTitles.slice(productCategoryPathTitles.indexOf('/') + 1);

        //     const priceLine = await this.priceLineService.findFirst({product_id: element.id as string});
            

        //     const productDTO = new ProductDTO(element, productCategoryPathsCustom.split('.'), productCategoryPathTitlesCustom, priceLine);

            
        //     products.push({...productDTO});
        // }
        
        return products; 
    }

    async findFirst(item: Product) {
        return await this.productRepository.findFirst(item);
    }

    async find(item: Product) {
        return await this.productRepository.find(item); 
    }

    async create(item: Product) {
        return await this.productRepository.create(item); 
    }

    async update(id: string, item: Product) {
        return await this.productRepository.update(id,item); 
    }

    async delete(id: string) {
        const response = await this.productRepository.delete(id);
        return response;  
    }
}