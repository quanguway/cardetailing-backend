import { Request, Response, Router } from "express";
import { AddressRepository } from "./address.repository";
import { AddressService } from "./address.service";

const table_name = 'staffs'

const routeAddress= Router();

const addressService = new AddressService();

routeAddress.get('/', async(req: Request, res: Response) => { 
    res.json(await addressService.getAll())
});
routeAddress.get('/test', async(req: Request, res: Response) => res.json(await addressService.getArrayJson()));
routeAddress.post('/save', async(req: Request, res: Response) => {
    const {treeData} = req.body;
    res.json(await addressService.saveChange(treeData))
});

routeAddress.get('/id', async(req: Request, res: Response) => {
    const {id} = req.body;
    res.json(await addressService.getNodeById(id))
});

routeAddress.get('/paths/title', async(req: Request, res: Response) => {
    const {title} = req.body;
    res.json(await addressService.getPathByTitle(title))
});


export default routeAddress;
