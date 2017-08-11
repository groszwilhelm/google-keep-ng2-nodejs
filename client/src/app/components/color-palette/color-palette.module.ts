import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPaletteComponent } from './color-palette.component';
import { ColorPaletteService } from './color-palette.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ColorPaletteComponent
    ],
    declarations: [
        ColorPaletteComponent
    ],
    providers: [
        ColorPaletteService
    ],
})
export class ColorPaletteModule { }
