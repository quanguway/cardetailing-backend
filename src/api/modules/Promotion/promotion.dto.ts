import { Permission } from "../Permission/permission";
import { PromotionLine } from "../PromotionLine/promotionLine";

export class PromotionDTO{
    id: string;
    title?: string;
    description?: string;
    date_created?: Date;
    date_updated?: Date;
    staff_updated?: Date;
    staff_created?: Date;
    promotionLines: PromotionLine[];
    constructor(data: any, promotionLines: PromotionLine[]) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.date_created = data.date_created;
      this.date_updated = data.date_updated;
      this.staff_updated = data.staff_updated;
      this.staff_created = data.staff_created;
      this.promotionLines = promotionLines;
    }
  }