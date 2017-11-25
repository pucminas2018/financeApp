import { RegAccount } from './../../reg-account/domain/reg-account';
export class CreditCard {
    
	codCartaoCredito:number;
    limite:number;
	operadora:string;
    conta: RegAccount;

    constructor(){
        this.conta = new RegAccount();
    }
}