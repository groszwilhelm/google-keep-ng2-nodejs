import { Injectable } from '@angular/core';

import { Subject } from "rxjs/Subject";
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/filter';

import { NotificationProperties } from './notifications.interface';
import { Observable } from "rxjs/Observable";

@Injectable()
export class NotificationsService {

    private subscriber = new Subject<any>();

    constructor() { }

    public getOpenObservable() {
        return this.subscriber
            .filter((observer) => {
                return observer.action == 'open';
            }).map((data) => {
                return data.properties;
            })
    }

    public getCloseObservable() {
        return this.subscriber
            .filter((observer) => {
                return observer.action == 'close';
            })
    }

    public openNotification(properties: NotificationProperties) {
        this.subscriber.next({ properties, action: 'open' });
    }

    public closeNotification() {
        this.subscriber.next({ action: 'close' });
    }
}