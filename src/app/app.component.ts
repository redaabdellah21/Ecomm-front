import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./services/catalogue.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthentificationService} from "./services/authentification.service";
import {CaddyService} from "./services/caddy.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  get s(): boolean {
    return this._s;
  }

  set s(value: boolean) {
    this._s = value;
  }

  get categories(): any {
    return this._categories;
  }

  set categories(value: any) {
    this._categories = value;
  }

  get currentCategory(): any {
    return this._currentCategory;
  }

  set currentCategory(value: any) {
    this._currentCategory = value;
  }

  get catService(): CatalogueService {
    return this._catService;
  }

  set catService(value: CatalogueService) {
    this._catService = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get authService(): AuthentificationService {
    return this._authService;
  }

  set authService(value: AuthentificationService) {
    this._authService = value;
  }
  get caddyService(): CaddyService {
    return this._caddyService;
  }

  set caddyService(value: CaddyService) {
    this._caddyService = value;
  }
  private _categories: any;
  private _s:boolean=true;
  private _currentCategory: any;

  constructor(private _catService:CatalogueService,
              private _router:Router,
              public _authService: AuthentificationService,
              private _caddyService: CaddyService) {
  }
  ngOnInit(): void {
    this._authService.loadAuthentificatedUserFromLocalStorage();

}
  public getCategories() {
    this._s=true;
    this._catService.getRessource("/categories").subscribe(data=>{
      this._categories=data;
      },err=>{
      console.log(err);
    })
  }



  onSelectedProducts() {
    this._s=false;
    this._currentCategory=undefined;
    this._router.navigateByUrl("products/1/0")
  }
  getProductsByCategory(c: { id: string; }) {
    this._s=true;
    this._currentCategory=c;
    this._router.navigateByUrl('/products/2/'+c.id);
  }
  onProductsPromo() {
    this._s=false;
    this._currentCategory=undefined;
    this._router.navigateByUrl("products/3/0")
  }
  onProductsDispo() {
    this._s=false;
    this._currentCategory=undefined;
    this._router.navigateByUrl("products/4/0")
  }

  onLogout() {
    this._s=false;
    this._authService.removeTokenFromLocalStorage();
    this._router.navigateByUrl("/login")
  }

  onDeleteCategory(id: number) {
    this.catService.deleteCategory(id).subscribe(
      (response :  void)=>{
        console.log(response);
        this.s=false;
      },
      (error :  HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    this.router.navigateByUrl("");

  }
}
