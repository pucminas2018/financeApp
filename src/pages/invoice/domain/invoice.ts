import { RegAccount } from './../../reg-account/domain/reg-account';
export class Invoice {

    codFatura: number;
	dataFechamentoFatura: Date;
	dataPagamentoFatura: Date;
    valorTotal: number;
	mesReferencia: number;
	cartaoCredito: RegAccount;
    
    constructor(){
        this.dataFechamentoFatura = new Date();
        this.dataPagamentoFatura = new Date();
        this.cartaoCredito = new RegAccount();
    }
}