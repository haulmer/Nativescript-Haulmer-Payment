import { HaulmerPaymentCommon } from './common';

export declare class HaulmerPayment extends HaulmerPaymentCommon {
    createComunication(amount: number, amountTip: number, paymentMethod: number, installmentsQuantity: number, cashback: number, printVoucherOnApp: boolean, extraData: string, dteType: number): Promise<IResult>;
    private packageChoose;
    private packageCheck;
}

export declare const PACKAGE_SUFFIX: string[];
export interface IResult {
    result?: SuccessResult;
}
export declare type SuccessResult = {
    transactionStatus: boolean;
    sequenceNumber: string;
    authCode?: string;
    date?: string;
    time?: string;
    last4?: string;
    accountingDate?: string;
    transactionMethod?: string;
    transactionAmount?: number;
    transactionTip?: number;
    transactionCashback?: number;
    transactionInstallments?: number;
    transactionAmountInstallments?: number;
    transactionTaxInstallments?: number;
    transactionDeferredPeriod?: number;
    transactionSignature?: boolean;
    aid?: string;
    applicationLabel?: string;
    promotion?: Promotion;
    extraData?: string;
    commerceCode?: string;
    deviceConfigId?: number;
    maxInstallmentsChargeFree?: number;
    printerVoucherCommerce?: boolean;
};
export declare type ErrorResult = {
    errorCode: number;
    errorMessage: string;
    errorCodeOnApp?: string;
    errorMessageOnApp?: string;
};
export declare type Promotion = {
    promotionType: string;
    date: string;
    promotionName: string;
    promotionDescription: string;
    promotionAwardName: string;
    promotionAwardCode: string;
};
export declare enum DteType {
    DTE_BILL_AFFECTS = 33,
    DTE_TICKET_AFFECTS = 48,
    DTE_DOCUMENT_EXENTS = 99,
    DTE_UNKNOWN = 0
}