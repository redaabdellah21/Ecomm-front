import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthentificationService} from "../services/authentification.service";
import {Product} from "../model/product.model";
import {CaddyService} from "../services/caddy.service";
import {NgForm} from "@angular/forms";
import {Employee} from "../model/employee";
import {Category} from "../model/category.model";
import {AppComponent} from "../app.component";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  get authenService(): AuthentificationService {
    return this._authenService;
  }

  set authenService(value: AuthentificationService) {
    this._authenService = value;
  }

  get products(): any {
    return this._products;
  }

  set products(value: any) {
    this._products = value;
  }

  get editPhoto(): boolean | undefined {
    return this._editPhoto;
  }

  set editPhoto(value: boolean | undefined) {
    this._editPhoto = value;
  }

  get currentProduct(): any {
    return this._currentProduct;
  }

  set currentProduct(value: any) {
    this._currentProduct = value;
  }

  get selectedFiles(): any {
    return this._selectedFiles;
  }

  set selectedFiles(value: any) {
    this._selectedFiles = value;
  }

  get progress(): any {
    return this._progress;
  }

  set progress(value: any) {
    this._progress = value;
  }

  get currentFileUpload(): any {
    return this._currentFileUpload;
  }

  set currentFileUpload(value: any) {
    this._currentFileUpload = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(value: number) {
    this._timestamp = value;
  }
  private _products: any;
  private _editPhoto: boolean | undefined;
  private _currentProduct: any;
  private _selectedFiles: any;
  private _progress: any;
  private _currentFileUpload: any;
  private _title: string="";
  private _timestamp : number=0;

  constructor(public catService: CatalogueService,
              private route:ActivatedRoute,
              private router:Router,
              private _authenService: AuthentificationService,
              private caddyService:CaddyService,
              public ap:AppComponent) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      (val)=>{
        if(val instanceof NavigationEnd){
          let url=val.url;
          console.log(url)
          let p1= this.route.snapshot.params["p1"];
          if(p1==1){
            this._title="Produits Selectionés";
            this.getProducts('/products/search/selectedProducts');
          }
          else if (p1==2){
            let idcategorie= this.route.snapshot.params["p2"];
            this._title="Produit de la catégorie: "+this.ap.currentCategory.categoryName;
            this.getProducts('/categories/'+idcategorie+'/products');
          }
          else if (p1==3){
            this._title="Produits en promotion";
            this.getProducts('/products/search/promoProducts');
          }
          else if (p1==4){
            this._title="Produit disponibles";
            this.getProducts('/products/search/dispoProducts');
          }
          else if (p1==5){
            this.getProducts('/products/search/dispoProducts');
          }
        }

      }
    );
    let p1= this.route.snapshot.params["p1"];
    if(p1==1){
      this.getProducts('/products/search/selectedProducts');
    }
    else if (p1==3){
      this._title="Produits en promotion";
      this.getProducts('/products/search/promoProducts');
    }
    else if (p1==4){
      this._title="Produit disponibles";
      this.getProducts('/products/search/dispoProducts');
    }
  }
  public getProducts(url: string){
    this.catService.getRessource(url)
      .subscribe(data=>{
        this._products=data;
      },err=>{
        console.log(err);
      })
  }

  onEditPhoto(p:any) {
    this._editPhoto=true;
    this._currentProduct=p;
  }

  uploadPhoto() {
    this._progress = 0;
    this._currentFileUpload = this._selectedFiles.item(0);
    this.catService.uploadPhotoProduct(this._currentFileUpload,this._currentProduct.id).subscribe(
      event=>{
        if(event.type===HttpEventType.UploadProgress){
          // @ts-ignore
          this._progress = Math.round(100 * event.loaded/ event.total);
          console.log(this._progress);
        }else if(event instanceof HttpResponse){
          alert("Fin de telechargement")
          this._timestamp=Date.now();
        }
      },err=>{
        alert("Problème de chargement "+ JSON.parse(err.error).message);

      }
    )
    this._selectedFiles =undefined;
  }

  onSelectedFile(event:any) {
    this._selectedFiles=event.target.files;
  }
  getTS(){
    return this._timestamp;
  }

  onAddProductToCaddy(p: Product) {
    this.caddyService.addProductToCaddy(p);
  }

  onProductDetails(p: Product) {
    let url= btoa(p._links.product.href);
    this.router.navigateByUrl("product-detail/"+url)
  }

  onAddProduct(addForm: NgForm) {
    // @ts-ignore
    document.getElementById("btnAddProduct").click();
    this.catService.addProduct(addForm.value).subscribe(
      (response :  Product)=>{
        console.log(response);
        addForm.reset();
      },
      (error :  HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    this.router.navigateByUrl("/products/1/0");

  }

 // onAddCategory(catName: String) {
    // @ts-ignore
    //document.getElementById("btnAddCategory").click();
  //  this.catService.addCategory(catName).subscribe(
    //  (response :  Category)=>{
      //  console.log(response);

   //   },
    //  (error :  HttpErrorResponse)=>{
    //    alert(error.message);
    // }
   // );
   // this.router.navigateByUrl("/products/1/0");

 // }
  onSearchProduct(searchform: string) {
    this.catService.SearchProduct(searchform.toString()).subscribe(
      (response :  Product)=>{
        console.log(response);
        this.onProductDetails(response);
      },
      (error :  HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
}
