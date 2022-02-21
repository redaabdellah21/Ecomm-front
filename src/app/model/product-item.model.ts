import {Product} from "./product.model";

export class ProductItem{
  public product: Product | undefined;
  public productId:number|undefined;
  public productName: string | undefined;
  public quantity: number | undefined;
  public price: number | undefined;
}
