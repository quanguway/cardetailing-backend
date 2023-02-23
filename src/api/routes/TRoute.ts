import { NextFunction, Request, Response, Router, } from 'express';
import * as Auth from './../middlewares/auth.middleware';
import knex from '../../database/knex'
import { ServiceRepository } from '../modules/Service/service.repository';

const db = knex;
const repository = new ServiceRepository(db, 'users');


const router = Router();

router.get('/', async (req, res, next) => {
	const columns = await knex('information_schema.columns')
  .where({ table_name : 'users' }).select('column_name');
  console.log(await repository.getAll())
  const data = [
  	{id: 1,
  	  	email: 'dasdasd',
  	  	name: 'asdasdw',
  	  	password: 'dasdwd',
  	  	email_verified_at: 'dasdwd',
  	  	created_at: 'dasdwd',
  	  	updated_at: 'asddw'},
  	  	{id: 2,
  	  	email: 'dasdasd',
  	  	name: 'asdasdw',
  	  	password: 'dasdwd',
  	  	email_verified_at: 'dasdwd',
  	  	created_at: 'dasdwd',
  	  	updated_at: 'asddw'}
  ]
	return res.render('dashboard-v1',{data, columns});
})

export default router;
