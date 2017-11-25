import { Account } from './../../signup/domain/account';
export class Category {

    codCategoria: number;
	descricao: string;
	tipoTransacao: string;
	usuario: Account;
	
    constructor(){
        this.usuario = new Account;
    }
}