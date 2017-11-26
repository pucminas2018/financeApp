import { Account } from './../../pages/signup/domain/account';
import { Http } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {
  url: string = 'http://mobilefinancesapp.azurewebsites.net';

  userLogged: Account = new Account();

  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
  getUser(email, senha, reqOpts){
    return this.http.get(this.url + '/usuario/'+ email +'/' + senha, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  setUserLogged(user){
    this.userLogged = user;
  }

  getUserLogged(){
    return this.userLogged;
  }
}
