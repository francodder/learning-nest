import { DBAdapter } from "../adapters/database.adapter";
export class TypeormClient implements DBAdapter {
  constructor() {}

  find: () => void;
  findOne: () => void;
  create: () => void;
  update: () => void;
  delete: () => void;
}
