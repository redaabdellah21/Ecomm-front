export class Product {
  constructor(
  private id:number,
  private name: string,
  private description: string,
  private currentPrice:number,
  private promotion: boolean,
  private selected: boolean,
  private available: boolean,
  private photoName: string,
  private category: any
){}
}
