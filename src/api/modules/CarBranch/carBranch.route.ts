import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";

const table_name = 'customers' 

const routeCarBranch = Router();

// routeCarBranch.get('/', async (req: Request, res: Response, next: NextFunction) => {
// 	const staffs = await customerService.getAll();
// 	res.json(staffs) 
// }) 

// routeCarBranch.post('/update', async (req: Request, res: Response, next: NextFunction) => {
// 	const {item, id} = req.body
	
// 	const staffEdited = await customerService.update(id, item);
// 	res.json(staffEdited) 
// })

// routeCarBranch.get('/phone', async (req: Request, res: Response, next: NextFunction) => {
// 	const { phone } = req.query;
// 	const customer = await customerService.findFirst({phone: phone as string})
	
// 	res.json(customer) 
// })

routeCarBranch.get('/', async (req: Request, res: Response, next: NextFunction) => {

	const response = [];

	const carBranchs = await knex('car_branch').select();

	for(const element of carBranchs) {
		const carinfo = await knex('car_info').where('car_branch_id', element.id).select();
		response.push({
			...element,
			"car_info": carinfo.map((item:any) => ({...item, title: item.model})),
		})
	}
	
	res.json(response) 
})

// routeCarBranch.delete('/', async (req: Request, res: Response, next: NextFunction) => {
// 	const {id} = req.body;
	 
// 	res.json(await customerService.delete(id))
// })

export default routeCarBranch;