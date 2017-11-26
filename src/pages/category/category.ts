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

  private categoryErrorString: string;
  private categorySucessString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public navParams: NavParams, 
    public items: Categories,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

      this.category = navParams.get('item') || items.defaultItem;      
      this.translateService.get('CATEGORY_ERROR').subscribe((value) => {
        this.categoryErrorString = value;
      })
      this.translateService.get('CATEGORY_SUCESS').subscribe((value) => {
        this.categorySucessString = value;
      })
    }
    
  doCategory() {
    this.category.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.category.tipoTransacao = "";
    this.postCategory(this.category).subscribe((resp) => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: this.categorySucessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }, (err) => {
      
      this.navCtrl.push(MainPage);
      
      let toast = this.toastCtrl.create({
        message: this.categoryErrorString,
        duration: 6000,
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