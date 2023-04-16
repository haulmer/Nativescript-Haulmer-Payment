import { Component, NgZone } from '@angular/core';
import { DemoSharedHaulmerPayment } from '@demo/shared';
import { } from '@nativescript/haulmer-payment';

@Component({
	selector: 'demo-haulmer-payment',
	templateUrl: 'haulmer-payment.component.html',
})
export class HaulmerPaymentComponent {
  
  demoShared: DemoSharedHaulmerPayment;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedHaulmerPayment();
  }

}