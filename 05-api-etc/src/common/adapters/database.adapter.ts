export interface DBAdapter {
  find: (any) => any;
  findOne: (any) => any;
  create: (any) => any;
  update: (any) => any;
  delete: (any) => any;
}
