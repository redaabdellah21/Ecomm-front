import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  get token(): string | undefined {
    return this._token;
  }

  set token(value: string | undefined) {
    this._token = value;
  }

  get users(): ({ password: string; roles: string[]; username: string } | { password: string; roles: string[]; username: string } | { password: string; roles: string[]; username: string })[] {
    return this._users;
  }

  set users(value: ({ password: string; roles: string[]; username: string } | { password: string; roles: string[]; username: string } | { password: string; roles: string[]; username: string })[]) {
    this._users = value;
  }
  get userAutentificated(): any {
    return this._userAutentificated;
  }

  set userAutentificated(value: any) {
    this._userAutentificated = value;
  }
  get isAuthentificated(): boolean {
    return this._isAuthentificated;
  }

  set isAuthentificated(value: boolean) {
    this._isAuthentificated = value;
  }
  private _users = [
    {username:"admin", password:"1234", roles:['ADMIN','USER']},
    {username:"user1", password:"1234", roles:['USER']},
    {username:"user2", password:"1234", roles:['USER']}
  ]
  private _isAuthentificated:boolean=false;
  private _userAutentificated: any;
  private _token: string | undefined;
  constructor() {}
  public login (username:string, password:string) {
    let user;
    this._users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        this._token=btoa(JSON.stringify({username:u.username,roles:u.roles}));
      }
    });
    if(user){
      this._isAuthentificated=true;
      this._userAutentificated=user;
    }
    else{
      this._isAuthentificated=false;
      this._userAutentificated=undefined;
    }
  }

  public isAdmin(){
    if (this.userAutentificated) {
      if (this.userAutentificated.roles.indexOf('ADMIN') > -1) {
        return true;
      }
    }
    return false;
  }
  public saveAuthentificatedUser(){
    if(this.userAutentificated){
      localStorage.setItem('authToken',<string>this.token);// btoa==> encoder le token
    }
  }
  public loadAuthentificatedUserFromLocalStorage(){
    let t= localStorage.getItem('authToken');
    if(t){
      // @ts-ignore
      let user=JSON.parse(atob(t));
      console.log(user);
      this.userAutentificated={username: user.username, roles: user.roles};
      this.isAuthentificated=true;
      this.token=t;
    }
  }

  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthentificated=false;
    this._token=undefined;
    this.userAutentificated=undefined;
  }
}
