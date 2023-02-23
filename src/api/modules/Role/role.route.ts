import express, { NextFunction, Request, Response, Router } from 'express';
import { RoleService } from './role.service';

const routeRole = express.Router();



const table_name = 'roles' 

const roleService = new RoleService();


routeRole.get('/', async (req: Request, res: Response, next: NextFunction) => {
	return res.json(await roleService.getAll());
});

routeRole.get('/id',async (req:Request, res: Response) => {
	const {id} = req.body;

	return res.json(await roleService.findById(id))
})



export default routeRole; 