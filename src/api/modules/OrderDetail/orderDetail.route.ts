import { NextFunction, Request, Response, Router } from "express";
import { OrderDetailRepository } from "./orderDetail.repository";
import { OrderDetailService } from "./orderDetail.service";

// const table_name = 'units' 

const routeOrderDetail = Router();

const orderDetailService = new OrderDetailService()

routeOrderDetail.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const unitExchange = await orderDetailService.getAll();
	res.json(unitExchange) 
})

routeOrderDetail.get('/booking_id', async (req: Request, res: Response, next: NextFunction) => {
	const {booking_id} = req.query;
	
	const reponse = await orderDetailService.find({booking_id: booking_id as string}) 
	res.json(reponse) 
})

routeOrderDetail.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {id, item} = req.body;
	console.log(item);
	
	const response = await orderDetailService.update(id, item);
	res.json(response);
})


routeOrderDetail.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await orderDetailService.delete(id))
})

// routeOrderDetail.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
// })

export default routeOrderDetail;