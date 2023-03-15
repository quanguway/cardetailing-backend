import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { CustomerService } from "./customer.service";

const table_name = 'customers' 

const routeCustomer = Router();
const customerService = new CustomerService()


routeCustomer.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const staffs = await customerService.getAll();
	res.json(staffs) 
}) 

routeCustomer.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {item, id} = req.body
	
	const staffEdited = await customerService.update(id, item);
	res.json(staffEdited) 
})

routeCustomer.get('/phone', async (req: Request, res: Response, next: NextFunction) => {
	const { phone } = req.query;
	const customer = await customerService.findFirst({phone: phone as string})
	
	res.json(customer) 
})

routeCustomer.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	const {item} = req.body
	const staffEdited = await customerService.create(item);
	res.json(staffEdited) 
})

routeCustomer.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await customerService.delete(id))
})

export default routeCustomer;