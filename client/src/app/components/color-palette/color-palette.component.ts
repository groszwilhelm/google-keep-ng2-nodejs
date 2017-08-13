import { Component, OnInit, OnDestroy } from '@angular/core';

import { Color } from './color.model';
import { ColorPaletteService } from './color-palette.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'color-palette',
    templateUrl: 'color-palette.component.html',
    styleUrls: ['color-palette.component.css']
})

export class ColorPaletteComponent implements OnInit, OnDestroy {
    private display = false;
    private color = new Color();
    private closeObservable: Subscription;
    private openObservable: Subscription;

    constructor(private colorService: ColorPaletteService) { }

    ngOnInit() {
        this.openObservable = this.colorService.getOpenObservable()
            .subscribe(() => this.display = true);

        this.closeObservable = this.colorService.getCloseObservable()
            .subscribe(() => this.display = false);
    }

    setColor(color: Color) {
        this.colorService.selectedColor$.next(color);
    }

    ngOnDestroy() {
        this.openObservable.unsubscribe();
        this.closeObservable.unsubscribe();
    }
}