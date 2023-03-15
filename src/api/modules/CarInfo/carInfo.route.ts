import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { CarInfoService } from "./carInfo.service";

const table_name = 'customers' 

const routeCarInfo = Router();
const carInfoService = new CarInfoService()


routeCarInfo.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const staffs = await carInfoService.getAll();
	res.json(staffs) 
})

// routeCarInfo.post('/update', async (req: Request, res: Response, next: NextFunction) => {
// 	const {item, id} = req.body
	
// 	const staffEdited = await carInfoService.update(id, item);
// 	res.json(staffEdited) 
// })

// routeCarInfo.post('/create', async (req: Request, res: Response, next: NextFunction) => {
// 	const {item} = req.body
// 	const staffEdited = await carInfoService.create(item);
// 	res.json(staffEdited) 
// })

routeCarInfo.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await carInfoService.delete(id))
})

export default routeCarInfo;