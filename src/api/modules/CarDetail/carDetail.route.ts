import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { CarDetailService } from "./carDetail.service";

const table_name = 'customers' 

const routeCarDetail = Router();
const carDetailService = new CarDetailService()


routeCarDetail.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const carDetail = await carDetailService.getAll();
	res.json(carDetail) 
})

routeCarDetail.get('/customer', async (req: Request, res: Response, next: NextFunction) => {
	const {customer_id} = req.query;
	
	const carDetail = await carDetailService.find({customer_id: customer_id as string});
	
	res.json(carDetail) 
})

// routeCarDetail.post('/update', async (req: Request, res: Response, next: NextFunction) => {
// 	const {item, id} = req.body
	
// 	const staffEdited = await carDetailService.update(id, item);
// 	res.json(staffEdited) 
// })

// routeCarDetail.post('/create', async (req: Request, res: Response, next: NextFunction) => {
// 	const {item} = req.body
// 	const staffEdited = await carDetailService.create(item);
// 	res.json(staffEdited) 
// })

routeCarDetail.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await carDetailService.delete(id))
})

export default routeCarDetail;