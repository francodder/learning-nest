import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from '../brands/brands.service';
import { BRANDS_MOCK } from './mocks/brands.mock';
import { CARS_MOCK } from './mocks/cars.mock';

@Injectable()
export class SeedService {
  constructor(
    private carsService: CarsService,
    private brandsService: BrandsService,
  ) {}

  populateDB() {
    this.carsService.fillWithMockData(CARS_MOCK);
    this.brandsService.fillWithMockData(BRANDS_MOCK);
    return 'Data base populated';
  }
}

