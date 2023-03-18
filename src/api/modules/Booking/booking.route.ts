import { NextFunction, Request, Response, Router } from "express";
import { CarDetailService } from "../CarDetail/carDetail.service";
import { CustomerService } from "../Custommer/customer.service";
import { BookingService } from "./booking.service";

const table_name = 'bookings' 

const routeBooking = Router();

const bookingService = new BookingService()
const customerService = new CustomerService();
const carDetailService = new CarDetailService();
 
// routeBooking.get('/', async (req: Request, res: Response, next: NextFunction) => {
// 	const staffs = await bookingService.getAll();
// 	res.json(staffs) 
// })

routeBooking.get('/id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.query;
	const staffs = await bookingService.findFirst({id: id as string});
	
	res.json(staffs) 
})

routeBooking.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {id, item} = req.body
	const response = await bookingService.update(id, item);
	res.json(response);
})

routeBooking.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	// console.log(req.body);
	const item = req.body
	
	const response = await bookingService.create(item);
	res.json(response);
})

routeBooking.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await bookingService.delete(id))
})

routeBooking.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
})

export default routeBooking;