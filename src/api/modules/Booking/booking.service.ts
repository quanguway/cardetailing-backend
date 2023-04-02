import knex from "../../../database/knex";
import { BookingDetail } from "../BookingDetail/bookingDetail";
import { BookingDetailService } from "../BookingDetail/bookingDetail.service";
import { CarDetailService } from "../CarDetail/carDetail.service";
import { CustomerRepository } from "../Custommer/customer.repository";
import { CustomerService } from "../Custommer/customer.service";
import { ProductRepository } from "../Product/product.repository";
import { PromotionDetailRepository } from "../PromotionDetail/promotionDetail.repository";
import { SlotService } from "../Slot/slot.service";
import { StaffService } from "../Staff/staff.service";
import { Booking } from "./booking";
import { BookingDTO } from "./booking.dto";
import { BookingRepository } from "./booking.repository";

export class BookingService {
  private readonly bookingRepository;
  private readonly bookingDetailService;
  private readonly customerRepository;
  private readonly carDetailservice;
  private readonly staffService;
  private readonly slotService;
  private readonly customerService;
  private readonly promotionDetailRepository;
  private readonly productRepository;

  constructor() {
    this.bookingRepository = new BookingRepository(knex, "booking");
    this.bookingDetailService = new BookingDetailService();
    this.customerRepository = new CustomerRepository(knex, "customers");
    this.customerService = new CustomerService();
    this.staffService = new StaffService();
    this.carDetailservice = new CarDetailService();
    this.slotService = new SlotService();
    this.promotionDetailRepository = new PromotionDetailRepository(
      knex,
      `promotion_details`
    );
    this.productRepository = new ProductRepository(knex, `products`);
  }

  // async getAll() {
  //     const response = await this.bookingRepository.getAll();
  //     const array: any = []
  //     for(const element of response) {
  //         const bookingDetails = await this.bookingDetailService.find({booking_id: element.id})
  //         const customer = await this.customerRepository.findFirst({id: element.customer_id})
  //         const dto = new BookingDTO(element, customer, bookingDetails as BookingDetail[]);
  //         array.push({...dto})
  //     }
  //     return array;
  // }

  async findFirst(item: Booking) {
    const book = await this.bookingRepository.findFirst(item);
    const customer = await this.customerRepository.findFirst({
      id: book.customer_id,
    });

    const bookDetails = await this.bookingDetailService.find({
      booking_id: book.id,
    });
    const carDetail = await this.carDetailservice.find({
      id: book.car_detail_id,
    });

    const dto = new BookingDTO(
      book,
      customer,
      bookDetails as BookingDetail[],
      carDetail[0]
    );

    return dto;
  }

  async update(id: string, item: Booking) {
    return await this, this.bookingRepository.update(id, item);
  }

  async create(item: any) {
    if (item.isNewCustomer) {
      //const add = await this.a
      const customer = await this.customerService.create(item.customer);
    }
    if (item.isNewCar) {
      const carDetail = await this.carDetailservice.create(item.car_detail);
    }

    const booking = {
      id: item.id,
      customer_id: item.customer.id,
      slot_id: item.slot_id,
      car_detail_id: item.car_detail.id,
      date_created: new Date(),
      status: "WAITING",
    };

    this.slotService.update(item.slot_id, {
      is_empty: false,
      booking_id: item.id,
    });

    const bookingCreated = await this.bookingRepository.create(booking);
    const bookingDetails = await this.bookingDetailService.createMany(
      item.booking_details
    );
  }

  async createWithOldCustomer(item: any) {
    const booking = {
      id: item.id,
      customer_id: item.customer_id,
      slot_id: item.slot_id,
      status: "WAITING",
    };

    this.slotService.update(item.slot_id, {
      is_empty: false,
      booking_id: item.id,
    });

    const bookingCreated = await this.bookingRepository.create(booking);
    const bookingDetails = await this.bookingDetailService.createMany(
      item.booking_details
    );
  }

  async delete(id: string) {
    const response = await this.bookingRepository.delete(id);
    return response;
  }
}
