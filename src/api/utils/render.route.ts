import { NextFunction, Request, Response, Router, } from 'express';
import * as Auth from './../middlewares/auth.middleware';
import knex from '../../database/knex'
import { BaseRepository } from '../repositories/base.repository';

export default async function renderControl(tableName: string, columnables?: string[]) {

  const db = knex;

  const router = Router();

  const columns = await knex('information_schema.columns')
    .where({ table_name : tableName })
    .select('column_name');

  router.get(`/${tableName.replace('_', '-')}`, async (req, res, next) => {
  	
    
    const data = await knex(tableName).select();

  	return res.render('render-control',{data, columns: columnables ?? columns});
  })
}