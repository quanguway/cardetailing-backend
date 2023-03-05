import { NextFunction, Request, Response, Router } from "express";
import { BookingService } from "./booking.service";

const table_name = 'bookings' 

const routeBooking = Router();

const bookingService = new BookingService()

routeBooking.get('/', async (req: Request, res: Response, next: NextFunction) => {
	
	const staffs = await bookingService.getAll();
	res.json(staffs) 
})

routeBooking.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	// console.log(req.body);
	const {id, item} = req.body
	const response = await bookingService.update(id, item);
	res.json(response);
})

routeBooking.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await bookingService.delete(id))
})

routeBooking.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
})

export default routeBooking;