import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./model/product.model";
import {Employee} from "./model/employee";
import {Category} from "./model/category.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public getRessource(url:string){
    return this.http.get(this.host+url);
  }
  public getProduct(url:string): Observable<Product>{
    return this.http.get<Product>(url);
  }

  // @ts-ignore
  uploadPhotoProduct(file : File, idProduct): Observable<HttpEvent<{}>> {
    let formdata : FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST',this.host+'/uploadPhoto/'+idProduct,formdata,{
      reportProgress: true,
      responseType:'text'
    });
    return  this.http.request(req);
  }

  public patchResource(url: string, data: any){
    return this.http.patch(url,data);
  }

  public addProduct(product : Product): Observable<Product>{
    return this.http.post<Product>(`${this.host}/product/add`,product);
  }
  public deleteProduct(productId : number): Observable<void>{
    return this.http.delete<void>(`${this.host}/product/delete/${productId}`);
  }

  public deleteCategory(categorytId : number): Observable<void>{
    return this.http.delete<void>(`${this.host}/category/delete/${categorytId}`);
  }

  public SearchProduct(productName : string){
    return this.http.get<Product>(this.host+`/product/findByName/${productName}`);
  }


  //addCategory(categoryName: String): Observable<Category> {
   // return this.http.post<Category>(`${this.host}/category/add/${categoryName}`);
 // }
}
