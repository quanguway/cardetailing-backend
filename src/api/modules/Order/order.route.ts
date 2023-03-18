import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { OrderService } from "./order.service";

// const table_name = 'staffs' 

const routeOrder = Router();
const orderService = new OrderService()


routeOrder.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const staffs = await orderService.getAll();
	res.json(staffs) 
})

routeOrder.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {item, id} = req.body
	
	const staffEdited = await orderService.update(id, item);
	res.json(staffEdited) 
})

routeOrder.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	const {item, orderDetails} = req.body
	
	const response = await orderService.create(item, orderDetails);
	res.json(response) 
})

routeOrder.post('/payment',async (req: Request, res: Response, next: NextFunction) => {
	const {order, order_details, slot_id} = req.body;
	const response = await orderService.payment(order, order_details, slot_id);
	res.json(response);
})

routeOrder.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await orderService.delete(id))
})

export default routeOrder;