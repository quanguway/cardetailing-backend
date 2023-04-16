import knex from "../../../database/knex";
import { Address } from "../Address/address";
import { AddressService } from "../Address/address.service";
import { PriceLineService } from "../PriceLine/priceLine.service";
import { RoleService } from "../Role/role.service";
import { PriceHeader } from "./priceHeader";
import { PriceHeaderDTO } from "./priceHeader.dto";
import { PriceHeaderRepository } from "./priceHeader.repository";

export class PriceHeaderService {
  private readonly priceHeader;
  private readonly priceLineService;

  constructor() {
    this.priceHeader = new PriceHeaderRepository(knex, "price_headers");
    this.priceLineService = new PriceLineService();
  }

  async getAll() {
    const response = await this.priceHeader.getAll();
    const units: any = [];
    for (const element of response) {
      const priceLines = await this.priceLineService.find({
        price_header_id: element.id as string,
      });
      const dto = new PriceHeaderDTO(element, priceLines);
      units.push({ ...dto });
    }

    return units;
  }

  async findFirst(item: PriceHeader) {
    return await this.priceHeader.findFirst(item);
  }

  async update(priceHeader: PriceHeader, priceLines: any) {
    var tmp = "";
      
      console.log(priceHeader);
      
      const priceHeaderCreated = await knex("price_headers").where('id', priceHeader.id)
        .update(priceHeader);

      console.log(priceLines.length === 0);
      

      if(priceLines.length === 0) return priceHeaderCreated;

      priceLines.map(
        (line: any) =>
          (tmp +=
            " ( lin.product_id = '" +
            line.product_id +
            "' and lin.unit_id = '" +
            line.unit_id +
            "') or ")
      );
      console.log(tmp.slice(0, tmp.length - 3));

      const reponse =
        await knex.raw(`select lin.id, pro.id as productID, pro.title as productTitle, hea.id as priceHeaderID , hea.title  as headerTitle, uni.id as unitID, uni.title as unitTitle
                            from price_lines as lin  
                            join price_headers as hea on hea.id = lin.price_header_id 
                            join products as pro on lin.product_id = pro.id
                            join units as uni on uni.id = lin.unit_id
                          where ((hea.end_date > '${
                            priceHeader.start_date
                          }' and hea.start_date <  '${priceHeader.end_date}')
                          or
                          (hea.start_date <=  '${
                            priceHeader.start_date
                          }' and hea.end_date >= '${priceHeader.end_date}' )
                          or
                          (hea.start_date >=  '${
                            priceHeader.start_date
                          }' and hea.end_date <= '${priceHeader.end_date}' ))
                          and hea.is_active = 1
                          and lin.is_active = 1
                          and (${tmp.slice(0, tmp.length - 3)})`);
      if (reponse[0].length > 0) return { status: "FAIL", data: reponse[0] };

      await knex("price_lines").where('price_header_id', priceHeader.id).del();

      const priceLineCustom = priceLines.map(({ ...element }) => {
        return { ...element, price_header_id: priceHeader.id };
      });

      await knex("price_lines").insert(priceLineCustom);

      return priceHeaderCreated;
  }

  async create(priceHeader: PriceHeader, priceLines: any) {
    try {
      console.log(priceHeader);
      console.log(priceLines);
      var tmp = "";
      priceLines.map(
        (line: any) =>
          (tmp +=
            " ( lin.product_id = '" +
            line.product_id +
            "' and lin.unit_id = '" +
            line.unit_id +
            "') or ")
      );
      console.log(tmp.slice(0, tmp.length - 3));

      const reponse =
        await knex.raw(`select lin.id, pro.id as productID, pro.title as productTitle, hea.id as priceHeaderID , hea.title  as headerTitle, uni.id as unitID, uni.title as unitTitle
                            from price_lines as lin  
                            join price_headers as hea on hea.id = lin.price_header_id 
                            join products as pro on lin.product_id = pro.id
                            join units as uni on uni.id = lin.unit_id
                          where ((hea.end_date > '${
                            priceHeader.start_date
                          }' and hea.start_date <  '${priceHeader.end_date}')
                          or
                          (hea.start_date <=  '${
                            priceHeader.start_date
                          }' and hea.end_date >= '${priceHeader.end_date}' )
                          or
                          (hea.start_date >=  '${
                            priceHeader.start_date
                          }' and hea.end_date <= '${priceHeader.end_date}' ))
                          and hea.is_active = 1
                          and lin.is_active = 1
                          and (${tmp.slice(0, tmp.length - 3)})`);
      if (reponse[0].length > 0) return { status: "FAIL", data: reponse[0] };
      else {
        await knex.transaction(async (trx: any) => {
          const reponse = await knex("price_headers")
            .insert(priceHeader)
            .transacting(trx);
          const priceLineCustom = priceLines.map(({ ...element }) => {
            return { ...element, price_header_id: priceHeader.id };
          });
          await knex("price_lines").insert(priceLineCustom).transacting(trx);
        });
        return { status: "SUCCESS" };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: string) {
    const response = await this.priceHeader.delete(id);
    return response;
  }
}
