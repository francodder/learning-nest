import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository, DataSource } from "typeorm";
import { validate as isUUID } from "uuid";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ProductImage } from "./entities/product-image.entity";

@Injectable()
export class ProductsService {
  // Muy util, te dice de donde esta viniendo el error
  private readonly logger = new Logger("ProductsService");

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>,
    // Contiene entre otras cosas la cadena de conexion de la BD
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { images = [], ...productDetails } = createProductDto;

    try {
      /* Las imagenes son creadas con el id de producto implicito */
      const product = await this.productRepository.create({ ...productDetails, images: images.map(url => this.productImageRepository.create({ url })) });
      await this.productRepository.save(product);
      return this.mapProductToFront(product);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        relations: {
          images: true, // Popula la info con las imagenes, esto es equivalente a utilizar "eager"
        },
      });

      return this.mapProductToFront(products);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const query = this.productRepository.createQueryBuilder("prod");
      product = await query.where("LOWER(title) = LOWER(:term) or LOWER(slug) = LOWER(:term)", { term }).leftJoinAndSelect("prod.images", "prodImages").getOne();
    }

    if (!product) {
      throw new NotFoundException(`No se encontro el producto con el termino ${term}`);
    } else {
      return this.mapProductToFront(product);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...toUpdate } = updateProductDto;

    /* Crea una nueva entidad a partir de un registro en la tabla (que busca por id), luego
       reemplaza todos los valores que se sobrescriban */
    //! Todas las operaciones con la BD son asincronas
    const product = await this.productRepository.preload({
      // preload no carga relaciones
      id,
      ...toUpdate,
    });

    if (!product) {
      throw new NotFoundException(`No se encontro el producto con ID ${id}`);
    }

    // Con el dataSource podemos crear queryBuilders y queryRunners que no dependan de ninguna entidad
    // Cono el queryRunner podemos hacer multiples acciones en la BD (transaccion)
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        /* Create no es una operacion asincrona */
        product.images = images.map(image => this.productImageRepository.create({ url: image }));
      }

      await queryRunner.manager.save(product);

      // Si todo sale bien los cambios se guardan en la BD
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.mapProductToFront(product);
    } catch (error) {
      // Si algo sale mal los cambios no se guardaran en la BD
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (product) {
      const { affected } = await this.productRepository.delete(id);
      return { message: `Se elimino ${affected} ${affected > 1 ? "productos" : "producto"}` };
    }
  }

  async removeAll() {
    const query = this.productRepository.createQueryBuilder("product");

    try {
      query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private mapProductToFront(products: Product | Product[]) {
    if (Array.isArray(products)) {
      return !!products?.length ? products.map(product => ({ ...product, images: product.images.map(img => img.url) })) : products;
    } else {
      const product = products;
      return { ...product, images: product.images.map(img => img.url) };
    }
  }

  private handleDBExceptions(error: any) {
    // Da formato y cambia los colores de los logs
    this.logger.error(error);
    if (error.code === "23505") throw new BadRequestException(error.detail);
    throw new InternalServerErrorException("Aiuuuuda!");
  }
}
