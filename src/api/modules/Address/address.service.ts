import { log } from "console";
import knex from "../../../database/knex";
import { BaseRepository } from "../../repositories/base.repository";
import { NodeModel, Tree } from "../../utils/Tree.utils";
import { Address } from "./address";
import { AddressRepository } from "./address.repository";

export class AddressService {
	private readonly addressRepository;
	private treeModel: any;
	constructor() { 
		this.addressRepository = new AddressRepository(knex, 'addresses')
		this.addressRepository.getAll().then((value) => {
			this.treeModel = new Tree(value);
		})
	}  
 
	getAll() {
		return this.treeModel.getJson();
	}

	getArrayJson() {
		return this.treeModel.getArrayJson()
	}
 
	create(item: Address) {
		return this.addressRepository.create(item)
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