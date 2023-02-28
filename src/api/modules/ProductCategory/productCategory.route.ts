import { Request, Response, Router } from "express";
import { ProductCategoryService } from "./productCategory.service";

const table_name = 'product_categories'

const routeProductCategory= Router();

const productCategoryService = new ProductCategoryService();

routeProductCategory.get('/', async(req: Request, res: Response) => { 
    res.json(await productCategoryService.getAll())
});
routeProductCategory.get('/test', async(req: Request, res: Response) => res.json(await productCategoryService.getArrayJson()));
routeProductCategory.post('/save', async(req: Request, res: Response) => {
    const {treeData} = req.body;
    res.json(await productCategoryService.saveChange(treeData))
});

routeProductCategory.get('/id', async(req: Request, res: Response) => {
    const {id} = req.body;
    res.json(await productCategoryService.getNodeById(id))
});

routeProductCategory.get('/paths/title', async(req: Request, res: Response) => {
    const {title} = req.body;
    res.json(await productCategoryService.getPathByTitle(title))
});
 

export default routeProductCategory;
