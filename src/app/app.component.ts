import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthentificationService} from "./services/authentification.service";
import {CaddyService} from "./services/caddy.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  get caddyService(): CaddyService {
    return this._caddyService;
  }

  set caddyService(value: CaddyService) {
    this._caddyService = value;
  }
  public categories: any;
  public currentCategory: any;

  constructor(private catService:CatalogueService,
              private router:Router,
              private authService: AuthentificationService,
              private _caddyService: CaddyService) {
  }
  ngOnInit(): void {
    this.authService.loadAuthentificatedUserFromLocalStorage();
    this.getCategories();
}
  private getCategories() {
    this.catService.getRessource("/categories").subscribe(data=>{
      this.categories=data;
      },err=>{
      console.log(err);
    })
  }



  onSelectedProducts() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("products/1/0")
  }
  getProductsByCategory(c: { id: string; }) {
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }
  onProductsPromo() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("products/3/0")
  }
  onProductsDispo() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("products/4/0")
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl("/login")
  }
}
