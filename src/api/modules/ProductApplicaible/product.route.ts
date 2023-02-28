import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { ProductService } from "../Product/product.service";

const table_name = 'products' 

const routeProduct = Router();
const productService = new ProductService()


routeProduct.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const products = await productService.getAll();
	res.json(products) 
})

routeProduct.post('/edit', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body
})

routeProduct.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.body;
	 
	res.json(await productService.delete(id))
})

routeProduct.get('/update', async (req: Request, res: Response, next: NextFunction) => {
	
})

export default routeProduct;