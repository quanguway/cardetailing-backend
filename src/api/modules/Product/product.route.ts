import { NextFunction, Request, response, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { ProductService } from "../Product/product.service";

const table_name = "products";

const routeProduct = Router();
const productService = new ProductService();

routeProduct.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productService.getAll();

    res.json(products);
  }
);

routeProduct.get(
  "/id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const products = await productService.findFirst({ id: id as string });

    res.json(products);
  }
);

routeProduct.get(
  "/without-price",
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productService.getAllWithoutPrice();

    res.json(products);
  }
);

routeProduct.post(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, item } = req.body;
    const response = await productService.update(id, item);
    return res.json({ msg: "success" });
  }
);

routeProduct.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const { item } = req.body;
    const response = await productService.create(item);
    return res.json({ msg: "success" });
  }
);

routeProduct.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    res.json(await productService.delete(id));
  }
);

routeProduct.get(
  "/duplicate-code",
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.query;
    const response = await productService.existByCode(code as string);
    res.json({
      is_duplicate: response,
    });
  }
);

// routeProduct.get('/update', async (req: Request, res: Response, next: NextFunction) => {

// })

export default routeProduct;
