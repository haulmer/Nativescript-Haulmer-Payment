import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { HaulmerPaymentComponent } from './haulmer-payment.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: HaulmerPaymentComponent }])],
  declarations: [HaulmerPaymentComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class HaulmerPaymentModule {}
