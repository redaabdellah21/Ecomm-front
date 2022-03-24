import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {CaddiesComponent} from "./caddies/caddies.component";
import {EmployeeComponent} from "./employee/employee.component";

const routes: Routes = [
  {path:'products/:p1/:p2', component:ProductsComponent},
  {path:'', redirectTo: 'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'product-detail/:url', component:ProductDetailComponent},
  {path:'caddies', component:CaddiesComponent},
  {path:'employee', component:EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
