import { Component, OnInit } from '@angular/core';
import {CaddyService} from "../services/caddy.service";
import {AppComponent} from "../app.component";


@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {
  get caddyService(): CaddyService {
    return this._caddyService;
  }

  set caddyService(value: CaddyService) {
    this._caddyService = value;
  }
  constructor(private _caddyService:CaddyService,
              private app:AppComponent){ }

  ngOnInit(): void {
    this.app.s=false;
  }

  onPay() {

      var txt;
      if (confirm("Confirmez le paiement")&&this.caddyService.getTotal()!==0) {
        txt = "Paiement effectué";
      }
      else if (this.caddyService.getTotal()==0) {
        txt = "Choisissez un produit";
      }else {
        txt = "Reessayez ";
      }
      // @ts-ignore
    document.getElementById("demo").innerHTML = txt;
    this.caddyService.caddies.clear();
    }


}
