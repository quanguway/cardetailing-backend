import { NextFunction, Request, response, Response, Router } from "express";
import { PriceHeaderService } from "../PriceHeader/priceHeader.service";
import { PriceLine } from "./priceLine";
import { PriceLineService } from "./priceLine.service";

// const table_name = 'units' 

const routePriceLine = Router();

const priceLineService = new PriceLineService()
const priceHeaderService = new PriceHeaderService()

routePriceLine.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const unitExchange = await priceLineService.getAll();
	res.json(unitExchange) 
})

routePriceLine.get('/price-header-id', async (req: Request, res: Response, next: NextFunction) => {
	const {price_header_id} = req.query;
	
	// const unitExchange = await priceLineService.getAll();
	const reponse = await priceLineService.find({price_header_id: price_header_id as string})
	
	res.json(reponse) 
})

routePriceLine.get('/product-and-unit', async (req: Request, res: Response, next: NextFunction) => {
	const {product_id, unit_id} = req.query;
	
	// const unitExchange = await priceLineService.getAll();
	const reponse = await priceLineService.findFirst({product_id: product_id as string, unit_id: unit_id as string})
	
	// const currentDate = new Date().getTime()
	// for (const item in response) {
	// 	const priceHeader = await priceHeaderService.findFirst({ id: item.price_header_id as string})
	// 	if(item.is_active && priceHeader.is_active && new Date(priceHeader.start_date ?? '').getTime() > currentDate && currentDate < new Date(priceHeader.end_date ?? '').getTime())
	// 	res.json(item)
	// }
	
	res.json(reponse);
})

routePriceLine.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {id, item} = req.body;
	const response = await priceLineService.update(id, item);
	res.json(response);
}) 


routePriceLine.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await priceLineService.delete(id))
})

// routePriceLine.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
// })

export default routePriceLine;