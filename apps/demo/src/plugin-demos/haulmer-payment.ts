import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedHaulmerPayment } from '@demo/shared';
import { } from '@nativescript/haulmer-payment';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedHaulmerPayment {
	
}
