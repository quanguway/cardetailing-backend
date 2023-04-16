import knex from "../../../database/knex";
import { ProductRepository } from "../Product/product.repository";
import { ProductService } from "../Product/product.service";
import { PromotionDetailService } from "../PromotionDetail/promotionDetail.service";
import { PromotionLine } from "./promotionLine";
import { PromotionLineDTO } from "./promotionLine.dto";
import { PromotionLineRepository } from "./promotionLine.repository";
import { PromotionLineProductDTO } from "./promotionLineProduct.dto";
export class PromotionLineService {
  private readonly promotionLineRepository;
  //   private readonly promotionDetailService;
  private readonly productRepository;
  constructor() {
    this.promotionLineRepository = new PromotionLineRepository(
      knex,
      "promotion_lines"
    );
    // this.promotionDetailService = new PromotionDetailService();
    this.productRepository = new ProductRepository(knex, "products");
  }

  async getAll() {
    const response = await this.promotionLineRepository.getAll();

    const array = [];
    for (const element of response) {
      const productBuy = this.productRepository.findFirst({
        id: element.product_buy_id,
      });

      const productReceived = this.productRepository.findFirst({
        id: element.product_received_id,
      });

      array.push(
        new PromotionLineProductDTO(element, productBuy, productReceived)
      );
    }
    return array;
  }

  async findFirst(item: PromotionLine) {
    return await this.promotionLineRepository.findFirst(item);
  }

  async find(item: PromotionLine) {
    const response = await this.promotionLineRepository.find(item);
    const promotionLines = [];
    for (const element of response) {
      const productBuy = await this.productRepository.findFirst({
        id: element.product_buy_id,
      });

      console.log(productBuy);

      const productReceived = await this.productRepository.findFirst({
        id: element.product_received_id,
      });

      //   const promotionDetail = await this.promotionDetailService.findFirst({
      //     promotion_line_id: element.id,
      //   });

      const promotionLine = new PromotionLineProductDTO(
        element,
        productBuy,
        productReceived
      );
      promotionLines.push({ ...promotionLine });
    }
    return promotionLines;
  }

  async delete(id: string) {
    const response = await this.promotionLineRepository.delete(id);
    return response;
  }
}
