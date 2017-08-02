import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

import { NotificationsService } from './notifications.service';
import { NotificationProperties, NotificationCssClasses, NotificationTypes } from './notifications.interface';

@Component({
    selector: 'notifications',
    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent implements OnInit {
    public showNotifications: boolean = false;
    public notificationMessage: string;
    public cssClass;

    constructor(private notificationsService: NotificationsService) { }

    ngOnInit() { 
        console.log('init notification listerners');
        this.notificationsService.getOpenObservable()
            .subscribe((properties: NotificationProperties) => {
                this.handleOpen(properties);
            });
        this.notificationsService.getCloseObservable()
            .subscribe(() => {
                this.handleClose();
            })
    }

    private handleOpen(properties: NotificationProperties) {
        this.showNotifications = true;
        this.notificationMessage = properties.message;
        this.closeOnTimeout(8000);
        this.applyCss(properties.type);
    }

    private closeOnTimeout(time) {
        setTimeout(() => {
            this.handleClose();
        }, time)
    }

    private applyCss(propertyTypes) {
        let notificationTypes = new NotificationTypes;
        let notificationCssClasses = new NotificationCssClasses;

        switch(propertyTypes) {
            case notificationTypes.SUCCESS:
                this.cssClass = notificationCssClasses.SUCCESS;
                break;
            case notificationTypes.ERROR:
                this.cssClass = notificationCssClasses.ERROR;
                break;
            case notificationTypes.INFO:
                this.cssClass = notificationCssClasses.INFO;
                break;
        }
    }

    private handleClose() {
        this.showNotifications = false;
    }
}