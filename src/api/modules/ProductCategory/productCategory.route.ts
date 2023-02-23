import { Request, Response, Router } from "express";
import { ProductCategoryService } from "./productCategory.service";

const table_name = 'product_categories'

const productCategoryAddress= Router();

const productCategoryService = new ProductCategoryService();

productCategoryAddress.get('/', async(req: Request, res: Response) => { 
    res.json(await productCategoryService.getAll())
});
productCategoryAddress.get('/test', async(req: Request, res: Response) => res.json(await productCategoryService.getArrayJson()));
productCategoryAddress.post('/save', async(req: Request, res: Response) => {
    const {treeData} = req.body;
    res.json(await productCategoryService.saveChange(treeData))
});

productCategoryAddress.get('/id', async(req: Request, res: Response) => {
    const {id} = req.body;
    res.json(await productCategoryService.getNodeById(id))
});

productCategoryAddress.get('/paths/title', async(req: Request, res: Response) => {
    const {title} = req.body;
    res.json(await productCategoryService.getPathByTitle(title))
});


export default productCategoryAddress;
