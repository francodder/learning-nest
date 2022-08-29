import { v4 as uuid } from 'uuid';
import { Car } from 'src/cars/interfaces/car.interface';

export const CARS_MOCK: Car[] = [
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
