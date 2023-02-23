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

	const staffWithoutPassword = staffs.map(({password, ...orther}) => orther);
	res.json(staffWithoutPassword) 
})

routeStaffs.post('/edit', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body
})

routeStaffs.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await staffService.delete(id))
})

routeStaffs.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
})

export default routeStaffs;