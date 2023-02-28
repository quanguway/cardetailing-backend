import { log } from "console";
import knex from "../../../database/knex";
import { BaseRepository } from "../../repositories/base.repository";
import { NodeModel, Tree } from "../../utils/Tree.utils";
import { ProductCategoryRepository } from "./productCategory.repositoy";


export class ProductCategoryService {
	private readonly productCategoryRepository;
	private treeModel: any;
	constructor() { 
		this.productCategoryRepository = new ProductCategoryRepository(knex, 'product_categories')
		this.productCategoryRepository.getAll().then((value) => {
			this.treeModel = new Tree(value);
		})
	}

	getAll() {
		return this.treeModel.getJson();
	}

	getArrayJson() {
		return this.treeModel.getArrayJson()
	}

	getNodeById(id:string) {
		return this.treeModel.getNodeById(id)
	}

	getPathByTitle(title: string) {
		return this.treeModel.getPathByTitle(title, this.treeModel.getJson());
	}

	getPath(node: any) {
		return this.treeModel.getPath()
	}

	async saveChange(productCategoryTree: any) {
		// productCategoryTree = (productCategoryTree as any[]).map(({expanded ,...attr}) => attr)
		this.treeModel = new Tree(productCategoryTree); 
		let arrayJson = (this.getArrayJson() as any[]).map(({expanded ,...attr}) => attr)
		
		await knex('productCategories').del();
		const response = await knex("productCategories").insert(arrayJson)
		return response; 
	}
}