import { AccountType } from './../../account-type/domain/account-type';
import { Account } from './../../signup/domain/account';
export class RegAccount {
    
    codConta: number;	
	tituloConta: string;	
	saldoAtual: number;
	usuario: Account;
	tipoConta: AccountType;

    constructor(){
        this.usuario = new Account();
        this.tipoConta = new AccountType;
    }
}