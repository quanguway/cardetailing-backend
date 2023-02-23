import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { generateToken } from './api/utils/jwt.utils';
import * as path from 'path';
import routes from './api/routes/TRoute';
import { config } from 'dotenv';
import bodyParser from'body-parser'
import routeStaffs from './api/modules/Staff/staff.route';
import renderControl from './api/utils/render.route';
import routeAuth from './api/modules/Auth/auth.route';
import routeAddress from './api/modules/Address/address.route';
import routeRole from './api/modules/Role/role.route';


// import expressLayouts from 'express-ejs-layouts';
// import logger from './api/middlewares/logger.middleware';
// import errorHandler from './api/middlewares/error-handler.middleware';

config({path: path.resolve(__dirname+'./../.env')});
const app = express();

  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());


  // if (process.env.NODE_ENV !== 'production') {
  //   console.log(generateToken());
  // }

  app.use('/admin', routes);
  app.use('/staff', routeStaffs)
  app.use('/auth', routeAuth)
  app.use('/address', routeAddress)
  app.use('/role', routeRole)

  renderControl('staffs')

  app.listen(process.env.NODE_PORT, () => {
    console.log(`http://localhost:${process.env.NODE_PORT}`);
  });