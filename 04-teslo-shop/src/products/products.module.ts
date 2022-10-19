import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommonModule } from "../common/common.module";

import { ProductImage, Product } from "./entities";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

@Module({
  imports: [
    /* Here are all enetities loaded, by consecuence it will be synchronized with the DB */
    TypeOrmModule.forFeature([Product, ProductImage]),
    CommonModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
