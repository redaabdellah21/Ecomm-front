import {Product} from "./product.model";

export interface Category {

  id:number;
  categoryName: string;
  products: Product[];
  _links:{
    self:{
      href:string;
    },
    product:{
      href:string;
    },
    category:{
      href:string;
    }
  }
}
