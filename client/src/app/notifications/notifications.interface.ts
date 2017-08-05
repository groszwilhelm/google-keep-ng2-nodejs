export interface NotificationProperties {
    type: string,
    message: string
}

export class NotificationTypes {
    public SUCCESS = 'SUCCESS';
    public ERROR = 'ERROR';
    public INFO = 'INFO';
}

export class NotificationCssClasses {
    public SUCCESS = 'alert alert-success alert-notifications';
    public ERROR = 'alert alert-danger alert-notifications';
    public INFO = 'alert alert-info alert-notifications';
}