import { NextFunction, Request, Response, Router } from "express";
import { BookingDetailService } from "./bookingDetail.service";

// const table_name = 'units' 

const routeBookingDetail = Router();

const bookingDetailService = new BookingDetailService()

routeBookingDetail.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const unitExchange = await bookingDetailService.getAll();
	res.json(unitExchange) 
})

routeBookingDetail.get('/booking_id', async (req: Request, res: Response, next: NextFunction) => {
	const {booking_id} = req.query;
	
	const reponse = await bookingDetailService.find({booking_id: booking_id as string}) 
	
	res.json(reponse) 
})

routeBookingDetail.post('/update', async (req: Request, res: Response, next: NextFunction) => {
	const {id, item} = req.body;
	console.log(item);
	
	const response = await bookingDetailService.update(id, item);
	res.json(response);
})


routeBookingDetail.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await bookingDetailService.delete(id))
}) 

// routeBookingDetail.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
// })

export default routeBookingDetail;