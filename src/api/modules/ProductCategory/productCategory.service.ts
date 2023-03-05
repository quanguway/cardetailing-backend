import { log } from "console";
import knex from "../../../database/knex";
import { BaseRepository } from "../../repositories/base.repository";
import { NodeModel, Tree } from "../../utils/Tree.utils";
import { ProductCategory } from "./productCategory";
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
 
	create(item: ProductCategory) {
		return this.productCategoryRepository.create(item)
	}

	getNodeById(id: string) {
		return this.treeModel.getNodeById(id)
	}

	isExist(id: string) {
		return this.treeModel.isExist(id);
	}

	getManyNodeByIds(ids: string[]) {
		const nodes: any[] = [];
		
		ids?.map((id) => {
			nodes.push(this.treeModel.getNodeById(id))
		})
		console.log(nodes);
		
		return nodes;
	}

	getPathById(id:string) {
		return this.treeModel.getPathById(id, this.treeModel.getJson())
	}

	getPathByTitle(title: string) {
		return this.treeModel.getPathByTitle(title, this.treeModel.getJson());
	}

	getPath(node: any) {
		return this.treeModel.getPath()
	}

	async saveChange(addressTree: any) {
		// addressTree = (addressTree as any[]).map(({expanded ,...attr}) => attr)
		this.treeModel = new Tree(addressTree); 
		let arrayJson = (this.getArrayJson() as any[]).map(({expanded ,...attr}) => attr)
		
		await knex('addresses').del();
		const response = await knex("addresses").insert(arrayJson)
		return response; 
	}
}