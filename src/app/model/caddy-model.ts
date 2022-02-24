import {ProductItem} from "./product-item.model";

export class Caddy {
  public name: string | undefined;
  public items: Map <number,ProductItem>= new Map();

  constructor(name:string) {
    this.name=name;
  }

}
