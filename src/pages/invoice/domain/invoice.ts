import { CreditCard } from './../../credit-card/domain/credit-card';
import { RegAccount } from './../../reg-account/domain/reg-account';
export class Invoice {

    codFatura: number;
	dataFechamentoFatura: Date;
	dataPagamentoFatura: Date;
    valorTotal: number;
	mesReferencia: number;
    cartaoCredito: CreditCard;

    
    constructor(){
        this.dataFechamentoFatura = new Date();
        this.dataPagamentoFatura = new Date();
        this.cartaoCredito = new CreditCard();
    }
}