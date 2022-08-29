import { v4 as uuid } from 'uuid';
import { Brand } from '../../brands/entities/brand.entity';

export const BRANDS_MOCK: Brand[] = [
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
