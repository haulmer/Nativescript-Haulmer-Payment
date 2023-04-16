import { HaulmerPaymentCommon } from './common';
import * as application from '@nativescript/core/application';
import PackageManager = android.content.pm.PackageManager;
import { Utils } from '@nativescript/core';

export class HaulmerPayment extends HaulmerPaymentCommon {

     /**
         * Method used to send the data from the native script app to OpenPago.
         * It receives all the possible values that can be send to OpenPago, and receives as promise
         * the response from it.
         */
     public createComunication(amount: number, amountTip: number, paymentMethod: number, installmentsQuantity: number, cashback: number,
        printVoucherOnApp: boolean, extraData = "", dteType: number): Promise<IResult> {
        let intent = null;
        let json = null;
        let jsonString = null;
        let activity = null;
        const packageManager = Utils.android.getApplicationContext().getPackageManager();
        const intentName = this.packageChoose(packageManager, "com.haulmer.paymentapp");
        intent = packageManager.getLaunchIntentForPackage(intentName);
        intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK | android.content.Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.setAction(android.content.Intent.ACTION_SEND);
        json = {
            "amount": amount,
            "tip": amountTip,
            "method": paymentMethod,
            "installmentsQuantity": installmentsQuantity,
            "cashback": cashback,
            "dteType": dteType,
            "extraData": extraData,
            "printVoucherOnApp": printVoucherOnApp
        };
        jsonString = JSON.stringify(json);
        console.log("JSON send: " + jsonString);
        intent.putExtra(android.content.Intent.EXTRA_TEXT, jsonString);
        intent.setFlags(0);
        intent.setType("text/json");
        activity = application.android.foregroundActivity || application.android.startActivity;
        activity.startActivityForResult(intent, 1000);

        return new Promise<IResult>((res, error) => {
            application.android.on(application.AndroidApplication.activityResultEvent, function (args: application.AndroidActivityResultEventData) {
                const resultCode = args.resultCode;
                const data = args.intent;
                if (resultCode === -1) {
                    const result = {
                        result: JSON.parse(data.getStringExtra("resultJson"))
                    };
                    res(result);
                } else {
                    error(JSON.parse(data.getStringExtra("resultJson")));
                }
            });
        });
    }

    private packageChoose(pm: PackageManager, name: string): string {
        let objective = "";
        objective = PACKAGE_SUFFIX.find(e =>
            this.packageCheck(pm, "com.haulmer.paymentapp" + e));
        console.log("intent: " + name + objective);
        return name + objective;
    }

    private packageCheck(pm: PackageManager, name: string): boolean {
        try {
            pm.getPackageInfo(name, 0);
            return true;
        } catch (error) {
            return false;
        }
    }

}

export const PACKAGE_SUFFIX = [
    ".dev",
    ".qa",
    ".integrator",
    ""
]
export interface IResult {
    result?: SuccessResult;
}

export type SuccessResult = {
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
}

export type ErrorResult = {
    errorCode: number;
    errorMessage: string;
    errorCodeOnApp?: string;
    errorMessageOnApp?: string;
}

export type Promotion = {
    promotionType: string;
    date: string;
    promotionName: string;
    promotionDescription: string;
    promotionAwardName: string;
    promotionAwardCode: string;
}

export enum DteType {
    DTE_BILL_AFFECTS = 33,
    DTE_TICKET_AFFECTS = 48,
    DTE_DOCUMENT_EXENTS = 99,
    DTE_UNKNOWN = 0
}