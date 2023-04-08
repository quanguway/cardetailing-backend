import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { Customer } from "../Custommer/customer";
import { CustomerRepository } from "../Custommer/customer.repository";
import { CustomerService } from "../Custommer/customer.service";
import { OrderDetailDTO } from "../OrderDetail/orderDetail.dto";
import { OrderDetailService } from "../OrderDetail/orderDetail.service";
import { PromotionHistoryRepository } from "../PromotionHistory/promotionHistory.repository";
import { PromotionLineRepository } from "../PromotionLine/promotionLine.repository";
import { RoleService } from "../Role/role.service";
import { SlotService } from "../Slot/slot.service";
import { Order } from "./order";
import { OrderDTO } from "./order.dto";
import { OrderRepository } from "./order.repository";

export class OrderService {
  private readonly orderRepository;
  private readonly slotService;
  private readonly orderDetailService;
  private readonly customerService;
  private readonly customerRepository;
  private readonly promtionLineRepository;
  private readonly promotionHistoryRepository;

  constructor() {
    this.orderRepository = new OrderRepository(knex, "orders");
    this.slotService = new SlotService();
    this.orderDetailService = new OrderDetailService();
    this.customerService = new CustomerService();
    this.customerRepository = new CustomerRepository(knex, "customers");
    this.promtionLineRepository = new PromotionLineRepository(
      knex,
      "promotion_lines"
    );
    this.promotionHistoryRepository = new PromotionHistoryRepository(
      knex,
      "promotion_histories"
    );
  }

  async getAll() {
    const response = await this.orderRepository.getAll();

    console.log("-----------------");

    const arr = [];
    for (const element of response) {
      const orderDetails = await this.orderDetailService.find({
        order_id: element.id,
      });
      console.log(orderDetails);

      const customer = await this.customerRepository.findFirst({
        id: element.customer_id,
      });
      const promotion =
        (await this.promotionHistoryRepository.findFirst({
          order_id: element.id,
        })) ?? null;

      const dto = new OrderDTO(
        element,
        orderDetails,
        customer as Customer,
        promotion
      );
      arr.push({ ...dto });
    }
    return arr;
  }

  async findFirst(item: Order) {
    return await this.orderRepository.findFirst(item);
  }

  async update(id: string, item: any) {
    const addressId = item.address.id;
    return await this.orderRepository.update(id, item);
  }

  async create(order: any, order_details: any[], promotion_line: any) {
    try {
      console.log("dasd");

      await knex.transaction(async (trx: any) => {
        console.log({ ...order, promotion_line_id: promotion_line[0].id });
        const reponse = await knex("orders")
          .insert({ ...order, promotion_line_id: promotion_line[0].id })
          .transacting(trx);
        const orderDetailCustom = order_details.map(({ ...element }) => {
          return {
            ...element,
            type: "SERVICE",
            status: "SERVICE",
            order_id: order.id,
          };
        });
        const orderDetailIds = await knex("order_details")
          .insert(orderDetailCustom)
          .transacting(trx);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async payment(
    order: any,
    order_details: any[],
    slot_id: string,
    promotion_line: any
  ) {
    try {
      console.log("******* 2 *******");
      console.log(promotion_line);

      order.date_created = new Date();
      order.final_total = order.total;
      if (promotion_line.promotionLine !== null) {
        order.final_total -= promotion_line.soTienGiam;
      }

      await knex.transaction(async (trx: any) => {
        const reponse = await knex("orders")
          .insert({
            ...order,
            promotion_line_id: promotion_line?.promotionLine?.id ?? null,
          })
          .transacting(trx);

        console.log("******* 3 *******");
        console.log(reponse);

        if (promotion_line.promotionLine !== null) {
          await knex("promotion_histories")
            .insert({
              order_id: order.id,
              amount: promotion_line.soTienGiam,
              type: promotion_line.promotionLine.type,
              status: promotion_line.promotionLine.type,
            })
            .transacting(trx);
        }
        console.log("******* 4 *******");

        // const orderDetailCustom = order_details.map(({...element }) => {return {...element,type:'SERVICE' , status: 'SERVICE', order_id: order.id}});
        const orderDetailIds = await knex("order_details")
          .insert(order_details)
          .transacting(trx);

        console.log("******* 5 *******");

        await this.slotService.update(slot_id, { is_empty: true });

        console.log("******* 6 *******");
      });
    } catch (error) {
      console.log("******* 7 *******");
      console.error(error);
    }
  }

  async delete(id: string) {
    const response = await this.orderRepository.delete(id);
    return response;
  }
}
