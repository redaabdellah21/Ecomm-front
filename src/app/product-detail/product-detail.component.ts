import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {AuthentificationService} from '../services/authentification.service';
import {HttpEventType, HttpResponse} from '../../../node_modules/@angular/common/http';
import {Product} from '../model/product.model';
import {CaddyService} from "../services/caddy.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductsComponent} from "../products/products.component";

@Component({
  selector: 'app-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
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

  get progress(): number | undefined {
    return this._progress;
  }

  set progress(value: number | undefined) {
    this._progress = value;
  }

  get currentFileUpload(): any {
    return this._currentFileUpload;
  }

  set currentFileUpload(value: any) {
    this._currentFileUpload = value;
  }

  get currentTime(): number | undefined {
    return this._currentTime;
  }

  set currentTime(value: number | undefined) {
    this._currentTime = value;
  }

  get editPhoto(): boolean | undefined {
    return this._editPhoto;
  }

  set editPhoto(value: boolean | undefined) {
    this._editPhoto = value;
  }

  get mode(): number {
    return this._mode;
  }

  set mode(value: number) {
    this._mode = value;
  }
  private _currentProduct:any ;
  private _selectedFiles:any;
  private _progress: number | undefined;
  private _currentFileUpload: any;
  private _currentTime: number | undefined;
  private _editPhoto: boolean | undefined;
  private _mode: number=0;

  constructor(private router:Router, private route:ActivatedRoute,
              public catalService:CatalogueService,
              public authService:AuthentificationService,
              public caddyService:CaddyService) {

  }

  ngOnInit() {
    let url= atob(this.route.snapshot.params['url']);
    this.catalService.getProduct(url)
      .subscribe(data=>{
        this._currentProduct=data;
      },err=>{
        console.log(err);
      })
  }
  onEditPhoto(p:Product) {
    this._currentProduct=p;
    this._editPhoto=true;
  }

  onSelectedFile(event:any) {
    this._selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this._progress = 0;
    this._currentFileUpload = this._selectedFiles.item(0)
    this.catalService.uploadPhotoProduct(this._currentFileUpload, this._currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        this._progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this._currentTime=Date.now();
        this._editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })
    this._selectedFiles = undefined
  }

  getTS() {
    return this._currentTime;
  }

  onProductDetails(p:Product) {
    this.router.navigateByUrl("/product/"+p.id);
  }

  onEditProduct() {
    this._mode=1;
  }

  onUpdateProduct(data: any) {
    let url=this.currentProduct._links.self.href;
    this.catalService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }

  onAddProductToCaddy(p: Product) {
    this.caddyService.addProductToCaddy(p);
  }

  onDeleteProduct(id:number) {
    this.catalService.deleteProduct(id).subscribe(
      (response :  void)=>{
        console.log(response);
        // @ts-ignore
      },
      (error :  HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    this.router.navigateByUrl("/products/1/0");
  }

  onSelectProduct(p: Product) {
    if(p.selected){
      p.selected=false;
    }
    else{
      p.selected=true;
    }
    this.onUpdateProduct(p)
  }
}
