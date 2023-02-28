import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { UnitService } from "./unit.service";

const table_name = 'units' 

const routeUnit = Router();

const unitService = new UnitService()

routeUnit.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const staffs = await unitService.getAll();
	res.json(staffs) 
})

routeUnit.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	// console.log(req.body);
	const {id, item} = req.body
	const response = await unitService.update(id, item);
	res.json(response);
})

routeUnit.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await unitService.delete(id))
})

routeUnit.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
})

export default routeUnit;