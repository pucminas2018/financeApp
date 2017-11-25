import { RegAccount } from './../../reg-account/domain/reg-account';
import { Category } from './../../category/domain/category';
import { Invoice } from './../../invoice/domain/invoice';
export class Transaction {

    codTransacao: number;
	valor: number;
	dataTransacao: Date;
	descricao: string;
	tipoTransacao: string;
	fatura: Invoice;
	categoria: Category;
    conta: RegAccount;
    
    constructor(){
        this.dataTransacao = new Date();
        this.fatura = new Invoice();
        this.categoria = new Category();
        this.conta = new RegAccount();
    }
}