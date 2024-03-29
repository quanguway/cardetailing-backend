import express, { NextFunction, Request, Response, Router } from 'express';
import { Customer } from '../Custommer/customer';
import { CustomerService } from '../Custommer/customer.service';
import bcrypt from 'bcrypt';
import { StaffRepository } from '../Staff/staff.repository';
import { StaffService } from '../Staff/staff.service';
import { PermissionService } from '../Permission/permission.service';
import { RegisterAuthDTO } from './auth.dto';
import { RoleService } from '../Role/role.service';

const routeAuth = express.Router();

// routeAuth.get('/login', async (req: Request, res: Response, next: NextFunction) => {
// 	return res.render('login');
// });

const table_name = 'customers' 

const customerService = new CustomerService();
const staffService = new StaffService();
const permissionService = new PermissionService()

routeAuth.post('/register', async (req: Request, res: Response, next: NextFunction) => {
 	const auth: Customer = req.body;
	if (!await customerService.findFirst({phone: auth.phone})) {
		const response = await customerService.create(auth);
		return res.json(response);
	} else {
		return res.json({err: 1, message: 'Số điện thoại này dã được đăng kí'})
	}
	
});  

routeAuth.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	const {phone, password} = req.body
	console.log(phone);
	
	const account = await staffService.findFirst({phone: phone})
	if (account && password) {
		if( await bcrypt.compare(password, account.password ?? '')) {
			const response = account;
			
			const role = await new RoleService().find({id: account?.role_id as string});
			const authDTO = new RegisterAuthDTO(response ,role[0]);
			
			return res.json(authDTO);
		} else {
		return res.json({err: 1, message: 'nhập sai mật khẩu'})

		}
	} else {
		return res.json({err: 1, message: 'Số điện thoại này chưa đăng kí tài khoản'})
	}
   
}); 



export default routeAuth; 