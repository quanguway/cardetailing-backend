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
            const productCategoryPathTitles = this.productCategoryService.getPathByTitle(productCategory.title);
            const productCategoryPaths = this.productCategoryService.getPathById(element.category_id as string)
            
            const productCategoryPathsCustom = productCategoryPaths;
            const productCategoryPathTitlesCustom = productCategoryPathTitles.slice(productCategoryPathTitles.indexOf('/') + 1);

            const productDTO = new ProductDTO(element, productCategoryPathsCustom.split('.'), productCategoryPathTitlesCustom);
            products.push({...productDTO});
        }
        
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