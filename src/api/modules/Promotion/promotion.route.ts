import { NextFunction, Request, Response, Router } from "express";
import { PromotionService } from "./promotion.service";

const table_name = "promotions";

const routePromotion = Router();

const promotiomService = new PromotionService();

routePromotion.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const promotions = await promotiomService.getAll();
    res.json(promotions);
  }
);

routePromotion.post(
  "/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
  }
);

routePromotion.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const param = req.body;
    res.json(await promotiomService.create(param));
  }
);

routePromotion.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    res.json(await promotiomService.delete(id));
  }
);

routePromotion.get(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {}
);

routePromotion.get(
  "/check-promotion-order",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, total } = req.query;
    res.json(
      await promotiomService.checkPromotionOrder(id as string, Number(total))
    );
  }
);

routePromotion.get(
  "/check-promotion-service",
  async (req: Request, res: Response, next: NextFunction) => {
    const { booking_details } = req.query;
    res.json(await promotiomService.checkPromotionService(booking_details));
  }
);

export default routePromotion;
