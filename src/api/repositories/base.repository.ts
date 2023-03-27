import type { Knex } from 'knex'
import { ColumnTable, Reader } from './reader.repository'
import { Writer } from './writer.repository';

export abstract class BaseRepository<T> implements Reader<T>, Writer<T> {
  constructor(
    public readonly knex: Knex,
    public readonly tableName: string,
  ) {}

  /**
   * create query builder following table
   * @return {Knex.QueryBuilder} [description]
   */
  public get queryBuilder(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }
  
  async getColumns(): Promise<ColumnTable[]> {
    return this.knex('information_schema.columns')
      .where({ table_name : this.tableName })
      .select('column_name', 'data_type');
  }
  /**
   * [getAll item in table]
   * @return {Promise<T[]>} [description]
   */
  getAll(): Promise<T[]> {
     return this.queryBuilder
    .select();
  }

  /**
   * find list object by item
   * @param  {Partial<T>}   item [description]
   * @return {Promise<T[]>}      [description]
   */
  find(item: Partial<T>): Promise<T[]> {
    return this.queryBuilder
      .where(item)
      .select();
  }

  /**
   * find first object by item
   * @param  {Partial<T>}   item [description]
   * @return {Promise<T[]>}      [description]
   */
  findFirst(item: Partial<T>): Promise<T> {
    return this.queryBuilder
      .where(item)
      .first()
      .select();
  }

  /**
   * find object by id
   * @param  {string  | Partial<T>}  id [description]
   * @return {Promise<T>}   [description]
   */
  findById(id: string | Partial<T> | undefined): Promise<T> {
      if (!id) {
        return this.queryBuilder.where("").first().select();
      }
      return typeof id === 'string' ?
       this.queryBuilder.where({id: id}).first().select() :
       this.queryBuilder.where(id).first().select();
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const output = await this.queryBuilder.insert<T>(item)
    
    return output as Promise<T>
  }
  createMany(items: Omit<T, 'id'>[]): Promise<T[]> {
      return this.queryBuilder.insert<T>(items) as Promise<T[]>
  }
  update(id: string, item: Partial<T>): Promise<boolean> {
      return this.queryBuilder
      .where('id', id)
      .update(item);
  }
  delete(id: string): Promise<boolean> {
    return this.queryBuilder
    .where('id', id)
    .del()
  }
  async exist(item: Partial<T>): Promise<boolean> {
    const itemCheck = await this.queryBuilder
      .where(item)
      .first()
      .select().then() 
      return ! itemCheck ? false : true;
  }
}