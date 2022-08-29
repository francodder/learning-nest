import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'ford',
      createdAt: new Date().getTime(),
      updatedAt: null,
    },
    {
      id: uuid(),
      name: 'toyota',
      createdAt: new Date().getTime(),
      updatedAt: null,
    },
    {
      id: uuid(),
      name: 'jeep',
      createdAt: new Date().getTime(),
      updatedAt: null,
    },
  ];

  create({ name }: CreateBrandDto) {
    const brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime(),
      updatedAt: null,
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand) throw new NotFoundException(`brand with ID ${id} not found`);
    return brand;
  }

  update(id: string, { name }: UpdateBrandDto) {
    const brandDB = this.findOne(id);
    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandDB.name = name.toLowerCase();
        brandDB.updatedAt = new Date().getTime();
        return brandDB;
      }
      return brand;
    });
    return brandDB;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter(brand => brand.id !== id);
    return brand;
  }
}

