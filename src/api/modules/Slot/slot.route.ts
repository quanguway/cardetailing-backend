import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { SlotService } from "./slot.service";

// const table_name = 'units' 

const routeSlot = Router();

const slotService = new SlotService()

routeSlot.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const response = await slotService.getAll();
	
	res.json(response) 
})

routeSlot.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {id, item} = req.body
	const response = await slotService.update(id, item);
	res.json(response); 
})

// routeSlot.post('/create', async (req: Request, res: Response, next: NextFunction) => {
// 	const {priceHeader, priceLines} = req.body
// 	const response = await slotService.create(priceHeader, priceLines);
// 	res.json(response);
// })

routeSlot.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await slotService.delete(id))
})

export default routeSlot;