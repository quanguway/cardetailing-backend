import { NextFunction, Request, Response, Router } from "express";
import knex from "../../../database/knex";
import { ColumnTable } from "../../repositories/reader.repository";
import renderControl from "../../utils/render.route";
import { UnitService } from "./unit.service";

const table_name = "units";

const routeUnit = Router();

const unitService = new UnitService();

routeUnit.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const staffs = await unitService.getAll();
  res.json(staffs);
});

// routeUnit.post(
//   "/update",
//   async (req: Request, res: Response, next: NextFunction) => {
//     // console.log(req.body);
//     const { id, item } = req.body;
//     const response = await unitService.update(id, item);
//     res.json(response);
//   }
// );

routeUnit.get(
  "/duplicate-code",
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.query;
    const response = await unitService.existByCode(code as string);
    res.json({
      is_duplicate: response,
    });
  }
);

routeUnit.get(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    const { product_id } = req.query;
    console.log(product_id);

    const response = await unitService.getUnitOfProduct(product_id as string);
    res.json(response);
  }
);

routeUnit.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    res.json(await unitService.delete(id));
  }
);

routeUnit.post(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    const { unit, id } = req.body;
    console.log(req.body);
    const unitEdited = await unitService.update(id, unit);
    res.json(unitEdited);
  }
);

routeUnit.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const { unit } = req.body;
    const unitEdited = await unitService.create(unit);
    res.json(unitEdited);
  }
);

export default routeUnit;
