import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})
export class TransactionPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  transaction: { data: Date, descricao: string, tipo_descricao: string, fatura: string, categoria: string, conta: number} = {
    data: new Date(),
    descricao: '',
    tipo_descricao: '',
    fatura: '',
    categoria: '',
    conta: 0
  };

  // Our translated text strings
  private transactionErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.transactionErrorString = value;
    })
  }

  doTransaction() {
    // Attempt to login in through our User service
    this.user.signup(this.transaction).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to credit transaction
      let toast = this.toastCtrl.create({
        message: this.transactionErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
