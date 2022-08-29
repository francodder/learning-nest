import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ModifyCar } from './dtos/modify-car.dto';
import { NewCarDto } from './dtos/new-car.dto';

/* Controllers should have as little logic as possible */

@Controller('cars') // handle all resquests from .../cars
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':carId')
  getCarById(@Param('carId', ParseUUIDPipe) carId: string) {
    return this.carsService.findById(carId);
  }

  @Get(':carId/price')
  getCarPriceById(@Param('carId', ParseUUIDPipe) carId: string) {
    /* Custom exception */
    throw new HttpException(
      'Endpoint not implemented',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  @Post()
  createCar(@Body() newCar: NewCarDto) {
    return this.carsService.create(newCar);
  }

  @Patch(':carId')
  updateCar(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() modifiedProps: ModifyCar,
  ) {
    return this.carsService.updateById(carId, modifiedProps);
  }

  @Delete(':carId')
  deleteCar(
    /* We can explicit which version of UUID want to validate */
    @Param('carId', new ParseUUIDPipe({ version: '4' })) carId: string,
  ) {
    return this.carsService.delete(carId);
  }
}

/* 
  Pipes transform or validate data.
  If an exception occurs inside the pipe, the exception zone handle it and the 
  controller method is not executed.

  There are 4 places to put a pipe:
  - In the param / argument
  - In the method of a controller
  - In the controller
  - Globally inside main.ts

  The main difference between an Interface and a DTO is that DTOs make validations
  in excecution time, interfaces only in transpiling time.
 */

