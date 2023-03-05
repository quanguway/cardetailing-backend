import { NextFunction, Request, Response, Router } from "express";
import { GroupCustomerService } from "./groupCustomer.service";

const table_name = 'customers' 

const routeGroupCustomer = Router();
const groupCustomerService = new GroupCustomerService()


routeGroupCustomer.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const staffs = await groupCustomerService.getAll();
	res.json(staffs) 
})

routeGroupCustomer.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {item, id} = req.body
	
	const staffEdited = await groupCustomerService.update(id, item);
	res.json(staffEdited) 
})

routeGroupCustomer.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	const {item} = req.body
	const staffEdited = await groupCustomerService.create(item);
	res.json(staffEdited) 
})

routeGroupCustomer.get('/customer-of-group-customer',async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.query;
	const response = await groupCustomerService.getCustomerOfGroupCustomer(id as string);
	res.json(response);
	
})

routeGroupCustomer.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await groupCustomerService.delete(id))
})

export default routeGroupCustomer;