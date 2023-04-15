import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { PriceHeaderService } from "./priceHeader.service";

// const table_name = 'units' 

const routePriceHeader = Router();

const priceHeaderService = new PriceHeaderService()

routePriceHeader.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const response = await priceHeaderService.getAll();
	
	res.json(response) 
})

routePriceHeader.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {priceHeader, priceLines} = req.body
	console.log(req.body);
	
	const response = await priceHeaderService.update(priceHeader, priceLines);
	res.json(response); 
})

routePriceHeader.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	const {priceHeader, priceLines} = req.body
	const response = await priceHeaderService.create(priceHeader, priceLines);
	res.json(response);
})

routePriceHeader.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await priceHeaderService.delete(id))
})

export default routePriceHeader;