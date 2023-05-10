export class Product {
  constructor(
    public readonly id: number = 0,
    public title: string = "",
    public description: string = "",
    public image: string = "",
    public price: number = 0
  ) {}
}
