import { Injectable } from '@angular/core';
import {Caddy} from "../model/caddy-model";
import {Product} from "../model/product.model";
import {ProductItem} from "../model/product-item.model";

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  get caddies(): Map<string, Caddy> {
    return this._caddies;
  }

  set caddies(value: Map<string, Caddy>) {
    this._caddies = value;
  }

  get currentCaddyName(): string {
    return this._currentCaddyName;
  }

  set currentCaddyName(value: string) {
    this._currentCaddyName = value;
  }
  private _caddies : Map <string,Caddy>=new Map();
  private _currentCaddyName:string="Caddy1";

  constructor() {
    let caddy=new Caddy(this._currentCaddyName);
    this._caddies.set(this._currentCaddyName,caddy);
  }

  public addProductToCaddy(product:Product):void{
    let caddy=this._caddies.get(this._currentCaddyName);
    // @ts-ignore
    let productItem:ProductItem= caddy.items.get(product.id);
    if(productItem){
      // @ts-ignore
      productItem.quantity+=product.quantity;
    }
    else{
      productItem=new ProductItem();
      productItem.product=product;
      productItem.productId=product.id;
      productItem.productName=product.name;
      productItem.quantity=product.quantity;
      productItem.price=product.currentPrice;
      // @ts-ignore
      caddy.items.set(product.id,productItem);
    }

  }
  getCurrentCaddy():Caddy{
    // @ts-ignore
    return this.caddies.get(this.currentCaddyName);
  }


  public getTotal(): number {
    let total=0;
    let items:IterableIterator<ProductItem>= this.getCurrentCaddy().items.values();
    for(let pi of items){
      // @ts-ignore
      total+=pi.price*pi.quantity;
    }
    return total;
  }
}
