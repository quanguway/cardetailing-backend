import { Request, Response, Router } from "express";
import { AddressRepository } from "./address.repository";
import { AddressService } from "./address.service";

const table_name = 'staffs'

const routeAddress= Router();

const addressService = new AddressService();

routeAddress.get('/', async(req: Request, res: Response) => { 
    console.log(await addressService.getAll());
    
    res.json(await addressService.getAll())
});

routeAddress.get('/none-root', async(req: Request, res: Response) => { 
    res.json(await addressService.getAll()[0].children)
});
routeAddress.get('/test', async(req: Request, res: Response) => res.json(await addressService.getArrayJson()));
routeAddress.post('/save', async(req: Request, res: Response) => {
    const {node} = req.body;
    res.json(await addressService.saveChange(node))
});

routeAddress.get('/id', async(req: Request, res: Response) => {
    const {id} = req.query;
    res.json(await addressService.getNodeById(id as string))
}); 

routeAddress.get('/ids', async(req: Request, res: Response) => {
    const {ids} = req.query;
    
    res.json(await addressService.getManyNodeByIds(ids as string[]))
}); 

routeAddress.get('/paths/title', async(req: Request, res: Response) => {
    const {title} = req.body;
    res.json(await addressService.getPathByTitle(title))
});


export default routeAddress;
