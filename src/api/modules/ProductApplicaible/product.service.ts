import knex from "../../../database/knex";
import { ProductCategoryService } from "../ProductCategory/productCategory.service";
import { RoleService } from "../Role/role.service";
import { Product } from "./product";
import { ProductDTO } from "./product.dto";
import { ProductRepository } from "./product.repository";

export class ProductService {
    private readonly productRepository;
    private readonly productCategoryService;

    constructor() {
        this.productRepository = new ProductRepository(knex, 'products');
        this.productCategoryService = new ProductCategoryService();
    }

    async getAll() {
        const response = await this.productRepository.getAll();
        
        const products: any = []
        for(const element of response) {
            const productCategory = this.productCategoryService.getNodeById(element.category_id as string);
            
            const productCategoryPaths = this.productCategoryService.getPathByTitle(productCategory.title)
            const productCategoryPathsCustom = productCategoryPaths.slice(productCategoryPaths.indexOf('.') + 1);
            const productDTO = new ProductDTO(element, productCategoryPathsCustom);
            products.push({...productDTO});
        }
        
        return products; 
    }

    async findFirst(item: Product) {
        return await this.productRepository.findFirst(item);
    }

    async delete(id: string) {
        const response = await this.productRepository.delete(id);
        return response;  
    }
}