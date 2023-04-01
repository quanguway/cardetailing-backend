import knex from "../../../database/knex";
import { NodeModel, Tree } from "../../utils/Tree.utils";
import { Address } from "./address";
import { AddressRepository } from "./address.repository";

export class AddressService {
  private readonly addressRepository;
  private treeModel: any;
  constructor() {
    this.addressRepository = new AddressRepository(knex, "addresses");
    knex.raw(`SELECT * FROM car_detailing.addresses order by level asc`).then((value: any) => {
      this.treeModel = new Tree(value[0]);
    }) 
  }

  getAll() {
    knex.raw(`SELECT * FROM car_detailing.addresses order by level asc`).then((value: any) => {
      this.treeModel = new Tree(value[0]);
    });
    return this.treeModel.getJson();
  }

  async getArrayJson() {
    await knex.raw(`SELECT * FROM car_detailing.addresses order by level asc`).then((value: any) => {
      this.treeModel = new Tree(value[0]);
    });
    
    return this.treeModel.getArrayJson();
  }

  async create(item: Address) {
    const addr = await this.addressRepository.create(item);
 
    await knex.raw(`SELECT * FROM car_detailing.addresses order by level asc`).then((value: any) => {
      this.treeModel = new Tree(value[0]);
    });

    return addr;
  }

  getNodeById(id: string) {
    return this.treeModel.getNodeById(id);
  }

  isExist(id: string) {
    return this.treeModel.isExist(id);
  }

  getManyNodeByIds(ids: string[]) {
    const nodes: any[] = [];

    ids?.map((id) => {
      nodes.push(this.treeModel.getNodeById(id));
    });
    
    return nodes;
  }

  getPathById(id: string) {
    return this.treeModel.getPathById(id, this.treeModel.getJson());
  }

  getPathByTitle(title: string) {
    return this.treeModel.getPathByTitle(title, this.treeModel.getJson());
  }

  getPath(node: any) {
    return this.treeModel.getPath();
  }

  async saveChange(node: any) {
      await knex("addresses").where('id', node.id).update(node);

      knex.raw(`SELECT * FROM car_detailing.addresses order by level asc`).then((value: any) => {
        this.treeModel = new Tree(value[0]);
      })

    return {msg: "thành công"};
  }
}