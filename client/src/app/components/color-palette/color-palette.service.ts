import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ColorPaletteService {
    public selectedColor$ = new Subject<any>();
    private action$ = new Subject<any>();


    constructor() { }

    public getOpenObservable() {
        return this.action$
            .filter(action => action === 'open');
    }
    
    public getCloseObservable() {
        return this.action$
            .filter(action => action === 'close');
    }

    public open() {
        this.action$.next('open');
    }

    public close() {
        this.action$.next('close');
    }
}