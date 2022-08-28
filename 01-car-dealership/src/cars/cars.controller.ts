import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars') // handle all resquests from .../cars
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':carId')
  getCarById(@Param('carId', ParseIntPipe) carId: number) {
    return this.carsService.findById(carId);
  }

  @Get(':carId/price')
  getCarPriceById(@Param('carId', ParseIntPipe) carId: number) {
    /* Custom exception */
    throw new HttpException(
      'Endpoint not implemented',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}

/* 
  Pipes transform or validate data, they are used for the arguments of a controller.
  If an exception occurs inside the pipe, the exception zone handle it and the 
  controller method is not executed.
 */

