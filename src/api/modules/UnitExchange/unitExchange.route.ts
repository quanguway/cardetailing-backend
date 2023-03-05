import { NextFunction, Request, Response, Router } from "express";
import { UnitExchangeService } from "./unitExchange.service";

// const table_name = 'units' 

const routeUnitExchange = Router();

const unitExchangeService = new UnitExchangeService()

routeUnitExchange.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const unitExchange = await unitExchangeService.getAll();
	res.json(unitExchange) 
})

routeUnitExchange.get('/unit_id', async (req: Request, res: Response, next: NextFunction) => {
	const {unit_id} = req.query;
	
	// const unitExchange = await unitExchangeService.getAll();
	const reponse = await unitExchangeService.find({unit_id: unit_id as string}) 
	res.json(reponse) 
})

routeUnitExchange.get('/product_id', async (req: Request, res: Response, next: NextFunction) => {
	const {product_id} = req.query;
	const reponse = await unitExchangeService.find({product_id: product_id as string}) 
	res.json(reponse) 
})

routeUnitExchange.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {id, item} = req.body;
	console.log(item);
	
	const response = await unitExchangeService.update(id, item);
	res.json(response);
})


routeUnitExchange.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await unitExchangeService.delete(id))
})

// routeUnitExchange.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
// })

export default routeUnitExchange;