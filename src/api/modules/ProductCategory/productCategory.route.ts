import { Request, Response, Router } from "express";
import { ProductCategoryService } from "./productCategory.service";


const routeProductCategory= Router();

const productCategoryService = new ProductCategoryService();

routeProductCategory.get('/', async(req: Request, res: Response) => { 
    res.json(await productCategoryService.getAllTree())
});

routeProductCategory.get('/none-root', async(req: Request, res: Response) => { 
    res.json(await productCategoryService.getAllTree()[0].children)
});
routeProductCategory.get('/test', async(req: Request, res: Response) => res.json(await productCategoryService.getArrayJson()));
routeProductCategory.post('/save', async(req: Request, res: Response) => {
    const {treeData} = req.body;
    res.json(await productCategoryService.saveChange(treeData))
});

routeProductCategory.get('/id', async(req: Request, res: Response) => {
    const {id} = req.query;
    res.json(await productCategoryService.getNodeById(id as string))
}); 

routeProductCategory.get('/ids', async(req: Request, res: Response) => {
    const {ids} = req.query;
    
    res.json(productCategoryService.getManyNodeByIds(ids as string[]))
}); 

routeProductCategory.get('/paths/title', async(req: Request, res: Response) => {
    const {title} = req.body;
    res.json(await productCategoryService.getPathByTitle(title))
});


export default routeProductCategory;
