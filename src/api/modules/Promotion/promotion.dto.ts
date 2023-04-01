import { Permission } from "../Permission/permission";
import { PromotionLine } from "../PromotionLine/promotionLine";

export class PromotionDTO {
  id: string;
  title?: string;
  description?: string;
  date_created?: Date;
  date_updated?: Date;
  code?: string;
  status?: Boolean;
  date_start?: Date;
  date_end?: Date;
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
    this.date_start = data.date_start;
    this.date_end = data.date_end;
    this.code = data.code;
    this.status = data.status;
    this.promotionLines = promotionLines;
  }
}
