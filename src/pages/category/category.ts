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
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  category: { titulo: string, transacao: number} = {
    titulo: '',
    transacao: 0
  };

  // Our translated text strings
  private categoryErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public navParams: NavParams, 
    public items: Categories,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

      this.category = navParams.get('item') || items.defaultItem;      
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.categoryErrorString = value;
    })
  }

  doCategory() {
    // Attempt to login in through our User service
    this.user.signup(this.category).subscribe((resp) => {
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
}
