import { Category } from './domain/category';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User, Categories } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  category:Category = new Category();
  option: any = {"Content-Type":"application/json"}
  _user: any;
  userLogged: any;

  private categoryErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public navParams: NavParams, 
    public items: Categories,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

     this.userLogged  = localStorage.getItem('userLogged');
      this.category = navParams.get('item') || items.defaultItem;      
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.categoryErrorString = value;
    })
  }

  doCategory() {
console.log(this.userLogged);
    this.postCategory(this.category).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      
      this.navCtrl.push(MainPage);
      
      let toast = this.toastCtrl.create({
        message: this.categoryErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  postCategory(accountInfo: any) {
    let seq = this.api.post('categoria', accountInfo, this.option).share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  _loggedIn(resp) {
    this._user = resp.user;
  }
}