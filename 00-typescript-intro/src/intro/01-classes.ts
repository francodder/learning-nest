export class FashionClass {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class FancyClass {
  constructor(readonly id: number, public name: string) {}
}
