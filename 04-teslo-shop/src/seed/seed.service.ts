import { Injectable } from "@nestjs/common";
import { ProductsService } from "../products/products.service";

import { productsData } from "./data/products.data";

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async populateProducts() {
    await this.productsService.removeAll();

    const insertPromises = [];

    productsData.forEach(prod => {
      insertPromises.push(this.productsService.create(prod));
    });

    await Promise.all(insertPromises);

    return "Ok";
  }
}
