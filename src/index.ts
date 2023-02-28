import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { generateToken } from './api/utils/jwt.utils';
import * as path from 'path';
import { config } from 'dotenv';
import bodyParser from'body-parser'
import routeStaffs from './api/modules/Staff/staff.route';
import renderControl from './api/utils/render.route';
import routeAuth from './api/modules/Auth/auth.route';
import routeAddress from './api/modules/Address/address.route';
import routeRole from './api/modules/Role/role.route';
import routeProductCategory from './api/modules/ProductCategory/productCategory.route';
import routeProduct from './api/modules/Product/product.route';
import routeUnit from './api/modules/Unit/unit.route';
import routePromotion from './api/modules/Promotion/promotion.route';
import routeUnitExchange from './api/modules/UnitExchange/unitExchange.route';


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

  app.use('/staff', routeStaffs)
  app.use('/auth', routeAuth)
  app.use('/address', routeAddress)
  app.use('/role', routeRole)
  app.use('/product-category', routeProductCategory)
  app.use('/product', routeProduct)
  app.use('/unit', routeUnit)
  app.use('/unit-exchange', routeUnitExchange)
  app.use('/promotion', routePromotion)

  renderControl('staffs')

  app.listen(process.env.NODE_PORT, () => {
    console.log(`http://localhost:${process.env.NODE_PORT}`);
  });