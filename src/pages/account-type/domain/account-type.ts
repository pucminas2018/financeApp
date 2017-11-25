import { Account } from './../../signup/domain/account';
export class AccountType {

    codTipoConta: number;
	descricao: string;
	usuario: Account;

    constructor(){
        this.usuario = new Account();
    }
}