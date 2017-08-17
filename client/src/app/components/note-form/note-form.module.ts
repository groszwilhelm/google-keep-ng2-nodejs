import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NoteFormComponent } from './note-form.component';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationsModule } from 'app/notifications/notifications.module';
import { ColorPaletteModule } from '../color-palette/color-palette.module';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NotificationsModule,
        ColorPaletteModule
    ],
    exports: [NoteFormComponent],
    declarations: [NoteFormComponent],
    providers: [],
})
export class NoteFormModule { }
