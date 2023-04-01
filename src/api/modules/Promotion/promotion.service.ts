import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { PromotionLineService } from "../PromotionLine/promotionLine.service";
import { RoleService } from "../Role/role.service";
import { UnitExchangeService } from "../UnitExchange/unitExchange.service";
import { Promotion } from "./promotion";
import { PromotionDTO } from "./promotion.dto";
import { PromotionRepository } from "./promotion.repository";
import { PromotionDetailRepository } from "../PromotionDetail/promotionDetail.repository";
import { PromotionLineRepository } from "../PromotionLine/promotionLine.repository";
import { BookingService } from "../Booking/booking.service";

export class PromotionService {
  private readonly promtionRepository;
  private readonly promotionLineService;
  private readonly promotionDetailRepository;
  private readonly promotionLineRepository;
  private readonly bookingService;

  constructor() {
    this.promtionRepository = new PromotionRepository(knex, "promotions");
    this.promotionLineService = new PromotionLineService();
    this.promotionDetailRepository = new PromotionDetailRepository(
      knex,
      "promotion_details"
    );
    this.promotionLineRepository = new PromotionLineRepository(
      knex,
      "promotion_lines"
    );
    this.bookingService = new BookingService();
  }

  async getAll() {
    const response = await this.promtionRepository.getAll();
    const promotions: any = [];
    for (const element of response) {
      const promotionLines = await this.promotionLineService.find({
        promotion_id: element.id,
      });
      const promotionDTO = new PromotionDTO(element, promotionLines);
      promotions.push({ ...promotionDTO });
    }
    return promotions;
  }

  async findFirst(item: Promotion) {
    return await this.promtionRepository.findFirst(item);
  }

  async create(params: any) {
    try {
      await this.promtionRepository.create(params.promotion);

      console.log(params.promotionDetail);

      const promotionLine = params.promotionDetail.map((item: any) => ({
        id: item.id,
        promotion_code: item.promotion_code,
        type: item.type,
        start_date: item.start_date,
        end_date: item.end_date,
        status: item.status === "Kích hoạt" ? true : false,

        maximum_reduction_amount: item.maximum_reduction_amount,
        product_received_id: item.product_received_id,
        product_buy_id: item.product_buy_id,
        quantity_product_buy: item.quantity_product_buy,
        quantity_product_received: item.quantity_product_received,
        minimum_total: item.minimum_total,
        percent: item.percent,
        total_budget: item.total_budget,
        max_customer: item.max_customer,

        promotion_id: params.promotion.id,
        title: item.title,
        description: item.description,
        note: item.note,
        date_created: item.date_created,
        date_updated: item.date_updated,
        staff_created: item.staff_created,
        staff_updated: item.staff_updated,
      }));

      await this.promotionLineRepository.createMany(promotionLine);
      //   await this.promotionDetailRepository.createMany(promotionDetail);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    const response = await this.promtionRepository.delete(id);
    return response;
  }


  async checkPromotionOrder(id: string) {
    const booking = await this.bookingService.findFirst({id:id});

    console.log(booking);
    return {status: 'SUCCESS', booking : booking};
  }
}
