import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { NewCarDto } from './dtos/new-car.dto';
import { ModifyCar } from './dtos/modify-car.dto';

@Injectable()
export class CarsService {
  /* All business logic goes here */

  /* A provider is a class that can be injected as a dependency */

  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'ford',
      model: 'fiesta',
    },
    {
      id: uuid(),
      brand: 'ford',
      model: 'ka',
    },
    {
      id: uuid(),
      brand: 'chevrolet',
      model: 'cruze',
    },
    {
      id: uuid(),
      brand: 'jeep',
      model: 'renegade',
    },
  ];

  findAll() {
    return [...this.cars];
  }

  findById(id: string) {
    const car = this.cars.find(car => car.id === id);
    if (!car) throw new NotFoundException(`Car with ID ${id} not found`);
    return car;
  }

  create(newCar: NewCarDto) {
    this.cars.push({
      id: uuid(),
      ...newCar,
    });
    return this.cars.at(-1);
  }

  updateById(id: string, modifiedProps: ModifyCar) {
    let carDB = this.findById(id);
    this.cars = this.cars.map(car => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...modifiedProps,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string) {
    const car = this.findById(id);
    this.cars = this.cars.filter(car => car.id !== id);
    return car;
  }
}

/* 
  Nest comes with a built-in exceptions layer which is responsible for processing all 
  unhandled exceptions across an application
*/

