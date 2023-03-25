import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { PromotionDetailService } from "./promotionDetail.service";

const table_name = 'promotions' 

const routePromotionDetail = Router();


routePromotionDetail.get('/price-final', async (req: Request, res: Response, next: NextFunction) => {

	const {final_price} = req.query;

	return res.json(await new PromotionDetailService().findByFinalPrice(final_price));
})


export default routePromotionDetail;