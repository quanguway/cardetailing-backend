import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { RoleService } from "../Role/role.service";
import { SlotService } from "../Slot/slot.service";
import { Order } from "./order";
import { OrderRepository } from "./order.repository";

export class OrderService {
    private readonly orderRepository;
    private readonly slotService;

    constructor() {
        this.orderRepository = new OrderRepository(knex, 'orders');
        this.slotService = new SlotService();
    }

    async getAll() {
        const response = await this.orderRepository.getAll();
        return response; 
    }

    async findFirst(item: Order) {
        return await this.orderRepository.findFirst(item);
    }

    async update(id:string, item: any) {
        const addressId = item.address.id;
        return await this.orderRepository.update(id, item);
    }
 
    async create(order: any, order_details: any[]) {
        try {
            await knex.transaction(async (trx: any) => {
                

                const reponse = await knex('orders').insert(order).transacting(trx); 
                const orderDetailCustom = order_details.map(({...element }) => {return {...element,type:'SERVICE' , status: 'SERVICE', order_id: order.id}});
                const orderDetailIds = await knex('order_details').insert(orderDetailCustom).transacting(trx);
                
              
            })
          } catch (error) { 
            console.error(error);
          }
    }

    async payment(order: any, order_details: any[], slot_id: string) {
        try {
            await knex.transaction(async (trx: any) => {
                

                const reponse = await knex('orders').insert(order).transacting(trx); 
                // const orderDetailCustom = order_details.map(({...element }) => {return {...element,type:'SERVICE' , status: 'SERVICE', order_id: order.id}});
                const orderDetailIds = await knex('order_details').insert(order_details).transacting(trx);
                await this.slotService.update(slot_id, {is_empty: true});
                
            })
          } catch (error) {  
            console.error(error);
          }
    }


    async delete(id: string) {
        const response = await this.orderRepository.delete(id);
        return response;  
    }
}