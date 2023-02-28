import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { Staff } from "./staff";
import { StaffService } from "./staff.service";

const table_name = 'staffs' 

const routeStaffs = Router();
const staffService = new StaffService()


routeStaffs.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const staffs = await staffService.getAll();
	res.json(staffs) 
})

routeStaffs.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {item, id} = req.body
	
	const staffEdited = await staffService.update(id, item);
	res.json(staffEdited) 
})

routeStaffs.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	const {item} = req.body
	const staffEdited = await staffService.create(item);
	res.json(staffEdited) 
})

routeStaffs.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await staffService.delete(id))
})

export default routeStaffs;