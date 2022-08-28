import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  /* All business logic goes here */

  /* A provider is a class that can be injected as a dependency */

  private cars = [
    {
      id: 1,
      brand: 'Ford',
      model: 'Fiesta',
    },
    {
      id: 2,
      brand: 'Ford',
      model: 'Ka',
    },
    {
      id: 3,
      brand: 'Chevrolet',
      model: 'Cruze',
    },
    {
      id: 4,
      brand: 'Jeep',
      model: 'Renegade',
    },
  ];

  findAll() {
    return [...this.cars];
  }

  findById(id: number) {
    const car = this.cars.find(car => car.id === id);
    if (!car) throw new NotFoundException(`Car with ID ${id} not found`);
    return car;
  }
}

/* 
  Nest comes with a built-in exceptions layer which is responsible for processing all 
  unhandled exceptions across an application
*/

